// tslint:disable:max-line-length
export let terminal = {
  help : [
    'ls',
    'man [file]',
    'cp [page]',
    'mush [command]'
  ],
  man : {
    man : [
      {name: 'man - an interface to the command reference manuals'},
      {synopsis: 'man [file]'},
      {description: 'Shows a name/synopsis/description of the command file'}
    ],
    mush : [
      {name: 'mush - Made-Up Shell'},
      {synopsis: 'mush [file]'},
      {description: 'Mush is a non-sh compatible language interpreter that executes commands read from the standard input and not files. This joke has gone on too far now..'}
    ],
    ls : [
      {name: 'ls - list directory contents'},
      {synopsis: 'ls'},
      {description: 'List information about the current page.'}
    ],
    cp : [
      {name: 'cp - change page'},
      {synopsis: 'cp [page]'},
      {description: 'Change current html page'}
    ]
  },
  fs: {
    '/': {
      name: '/',
      type : 'dir',
      requireSudo: true,
      ref: {
        'root.txt' : {
          name: 'root.txt',
          type : 'file',
          requireSudo: true,
          parent: '/',
          text: 'root!'
        },
        about : {
          name: 'about',
          type : 'dir',
          requireSudo: false,
          parent: '/',
          ref : {
            'about.txt': {
              name: 'about.txt',
              type: 'file',
              text: ['<b>I\'ve gone too far</b>']
            }
          }
        },
        resume : {
          name: 'resume',
          type : 'dir',
          requireSudo: false,
          parent: '/',
          ref : {
            'resume.txt': {
              name: 'resume.txt',
              type: 'file',
              text: ['About!']
            }
          }
        },
        portfolio : {
          name: 'portfolio',
          type : 'dir',
          requireSudo: false,
          parent: '/',
          ref : {
            'portfolio.txt': {
              name: 'portfolio.txt',
              type: 'file',
              text: ['About!']
            }
          }

        }
      }
    }
  },
  proc : {
    sudo : {
      step: [
        { prompt: 'Password: ' }
      ]
    }
  }
};
