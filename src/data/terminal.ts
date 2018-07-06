// tslint:disable:max-line-length
export let terminal = {
  help : [
    'mush [command]',
    'help',
    'exit',
    'sudo [command]',
    'man [command]',
    'ls [directory]',
    'cd [directory]',
    'cat [file]',
    'pwd',
    'edit [file]'
  ],
  man : {
    mush : [
      {name: 'mush - Made-Up Shell'},
      {synopsis: 'mush [file]'},
      {description: 'Mush is a non-sh compatible language interpreter that executes commands read from the standard input and not files. This is a joke that has gone on too far.'}
    ],
    help : [
      {name: 'help - Show the help screen'},
      {synopsis: 'help'},
      {description: 'Shows all of the available `mush` commands.'}
    ],
    exit : [
      {name: 'exit - Exit the `mush` shell and return to your web-browsing experience'},
      {synopsis: 'exit'},
      {description: 'Closes the current `mush` screen and goes back to browser. State is maintained while the shell is closed.'}
    ],
    sudo : [
      {name: ' sudo - execute a command as another user'},
      {synopsis: 'sudo [command]'},
      {description: 'In `mush` this command is used to login to the super user or execute a command as the super user. It may help you discover some interesting secrets.'}
    ],
    man : [
      {name: 'man - an interface to the command reference manuals'},
      {synopsis: 'man [command]'},
      {description: 'Shows a name/synopsis/description of the command file'}
    ],
    ls : [
      {name: 'ls - list directory contents'},
      {synopsis: 'ls'},
      {description: 'List information about the current page.'}
    ],
    cd : [
      {name: 'cd - change directory'},
      {synopsis: 'cd [directory]'},
      {description: 'Change current directory. This will also change the page that the browser is currently displaying.'}
    ],
    cat : [
      {name: 'cat - print files'},
      {synopsis: 'cat [file]'},
      {description: 'Prints out the file onto the terminal screen'}
    ],
    edit : [
      {name: 'edit - edit files'},
      {synopsis: 'edit [file]'},
      {description: 'It\'s not vim. But it does edit files.'}
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
          text: ['root!']
        },
        about : {
          name: 'about',
          type : 'dir',
          requireSudo: false,
          parent: '/',
          ref : {
            'about.html': {
              name: 'about.html',
              type: 'file',
              text: ['\n' +
              '<h2>/about</h2>\n' +
              '\n' +
              '<p>\n' +
              '  Hi, my name is Regan. I’m a software engineer. I enjoy doing a lot of different things;\n' +
              '  I love playing video games and catching up on whatever series I’m watching in my spare time,\n' +
              '  but I’m passionate about the outdoors. I like to hike, travel, snowboard - anything that gets me outside and away from a screen for a little while.\n' +
              '</p>\n' +
              '\n' +
              '<p>\n' +
              '  I think my favorite thing about tech is being able to use my skills to solve ordinary problems.\n' +
              '  Need a website for your thing? I can do that. Need to automate some of your work? I can do that too!\n' +
              '  How about an app that does both of those things? I’d love to! New projects and challenges excite me;\n' +
              '  outside of what I do in my day-to-day I attempt to stay on the cutting edge by spending my time developing whatever ideas I’ve come up with recently.\n' +
              '</p>\n' +
              '\n' +
              '<p>\n' +
              '  I like to think there\'s a lot more to me than a three paragraph blurb on a website can say.\n' +
              '  If you want to get to know me better, feel free to message me on <a href="">LinkedIn</a> or via <a href="">email</a>. If we have similar interests or mindset I’d love to chat.\n' +
              '</p>\n']
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
