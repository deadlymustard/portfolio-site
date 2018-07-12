import { Component, OnInit } from '@angular/core';
import {TerminalService} from '../terminal.service';
import {FileService} from '../file.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  dropBoxLink: string;
  dropBoxDownloadLink: string;

  myStyle: object = {};
  myParams: object = {};

  constructor(
    private terminalService: TerminalService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.fileService.getFileUrlLink('design_doc').subscribe((url: any) => {
      this.dropBoxLink = url.link;
      this.dropBoxDownloadLink = url.link.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    });
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'background': 'darkslategray'
    };

    this.myParams = {
      'particles': {
        'number': {
          'value': 80,
          'density': {
            'enable': true,
            'value_area': 800
          }
        },
        'color': {
          'value': '#9cffa8'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#000000'
          },
          'polygon': {
            'nb_sides': 6
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.4008530152163807,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 1,
            'opacity_min': 0.1,
            'sync': false
          }
        },
        'size': {
          'value': 1,
          'random': false,
          'anim': {
            'enable': false,
            'speed': 97.4492654761614,
            'size_min': 16.2415442460269,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 150,
          'color': '#28a745',
          'opacity': 0.49705773886831206,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': 3.206824121731046,
          'direction': 'none',
          'random': true,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 481.0236182596568,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': false,
            'mode': 'repulse'
          },
          'onclick': {
            'enable': true,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 8,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    };
  }

}
