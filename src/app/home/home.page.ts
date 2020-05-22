import {Howl} from 'howler';
import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';

export interface Track{
  name:string;
  artist:string;
  path:string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  playlist: Track[] = [
    {
      name: 'Los Malaventurados No Lloran',
      artist: 'PXNDX',
      path: 'assets/Music/Los Malaventurados No Lloran - PXNDX.mp3'
    },
    {
      name: 'Las Luces de Esta Ciudad',
      artist: 'Division Minuscúla',
      path: 'assets/Music/Las Luces De Esta Ciudad - Division Minuscúla.mp3'
    },
    {
      name: 'Hey Jude',
      artist: 'The Beatles',
      path: 'assets/Music/Hey Jude - The Beatles.mp3'
    },
    {
      name: 'Memories',
      artist: 'Maroon 5',
      path: 'assets/Music/Memories - Maroon 5.mp3'
    },
    {
      name: 'Wake Me Up When September Ends',
      artist: 'Green Day',
      path: 'assets/Music/Whake Me Up When Semptember Ends - Green Day.mp3'
    },
    {
      name: 'Let It Be',
      artist: 'The Beatles',
      path: 'assets/Music/Let It Be - The Beatles.mp3'
    }
  ]

  activeTrack : Track = null;
  player : Howl = null;
  isPlaying = false;
  progress = 0; 
  @ViewChild('range',{static : false}) range : IonRange;

  constructor() {}

  start(track:Track)
  {
    console.log(this.player)
    if(this.player){
     this.player.stop();
    }
    
    this.player = new Howl({
      src:  [track.path],
      onplay: () =>   {
        console.log("onplay");
        console.log(this.player),
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log("onend")
      }
    });
    this.player.play();
  }

  togglePlayer(pause)
  {
    this.isPlaying = !pause;
    if(pause){
      this.player.pause();
    }else{
      this.player.play();
    }
  }

  next()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index!=this.playlist.length - 1){
        this.start(this.playlist[index+1]);
    }else{
      this.start(this.playlist[0])
    }
  }

  prev()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index>0){
        this.start(this.playlist[index-1]);
    }else{
      this.start(this.playlist[this.playlist.length - 1])
    }
  }

  seek(){
    let newValue =+ this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress(){
    let seek = this.player.seek(); 
    this.progress = (seek / this.player.duration())*100 || 0;
    setTimeout(() => {
      this.updateProgress();
    },1000)
  }
}
