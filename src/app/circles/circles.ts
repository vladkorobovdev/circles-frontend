import {Component, HostListener, inject, signal, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {colors} from './colors';

interface ICircle {
  id: number;
  x: number;
  y: number;
  color: string;
}

@Component({
  selector: 'app-circles',
  imports: [],
  templateUrl: './circles.html',
  styleUrl: './circles.css',
  encapsulation: ViewEncapsulation.None
})
export class Circles {
  private router = inject(Router)
  circles = signal<ICircle[]>([])
  isRandomColorsMode: boolean = false;
  colorNum: number = 0;

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.router.navigateByUrl('/');
    }
    if (e.key === 'ArrowUp') {
      if (this.isRandomColorsMode) {
        this.isRandomColorsMode = false;
      } else if (this.colorNum >= colors.length - 1) {
        this.isRandomColorsMode = true;
        this.colorNum = 0;
      } else {
        this.colorNum++;
      }
    }
    if (e.key === 'ArrowDown') {
      if (this.isRandomColorsMode) {
        this.isRandomColorsMode = false;
      } else if (this.colorNum <= 0) {
        this.isRandomColorsMode = true;
        this.colorNum = colors.length - 1;
      } else {
        this.colorNum--;
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const circle: ICircle = {
      id: Date.now() + Math.random() * 100,
      x: e.clientX,
      y: e.clientY,
      color: this.isRandomColorsMode ? colors[Math.floor(Math.random() * colors.length)] : colors[this.colorNum],
    };
    this.circles.update(prev => [...prev, circle])
  }

  removeCircle(circleId: number) {
    this.circles.update(prev => prev.filter(c => c.id !== circleId));
  }
}
