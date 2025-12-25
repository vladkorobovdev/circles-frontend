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
  private lastTouchTime = 0;

  @HostListener('document:touchend', ['$event'])
  onRootTouchEnd(event: TouchEvent) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTouchTime;

    if (tapLength < 200 && tapLength > 0) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
    this.lastTouchTime = currentTime;
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') this.goToHome();
    if (e.key === 'ArrowUp') this.changeColor('up');
    if (e.key === 'ArrowDown') this.changeColor('down');
  }

  changeColor(direction: 'up' | 'down') {
    if (direction === 'up') {
      if (this.isRandomColorsMode) {
        this.isRandomColorsMode = false;
      } else if (this.colorNum >= colors.length - 1) {
        this.isRandomColorsMode = true;
        this.colorNum = 0;
      } else {
        this.colorNum++;
      }
    } else {
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

  goToHome() {
    this.router.navigateByUrl('/');
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(e: PointerEvent) {
    if (e.cancelable) {
      e.preventDefault()
    }

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
