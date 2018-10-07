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
              '\n' +
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
            'resume.html': {
              name: 'resume.html',
              type: 'file',
              text: ['<div class="resume-wrapper">\n' +
              '  <div class="resume-header">\n' +
              '    <p>Regan D. Shaner</p>\n' +
              '    <p>New York, NY</p>\n' +
              '  </div>\n' +
              '\n' +
              '  <div class="resume-education">\n' +
              '    <h4>Education</h4>\n' +
              '    <hr />\n' +
              '    <div class="resume-entry">\n' +
              '      <h5>Rutgers University<span  class="resume-side-text float-right">Aug. 2013 - May 2016</span></h5>\n' +
              '      <h6>Computer Science, B.S.<span  class="resume-side-text float-right">New Brunswick, NJ</span></h6>\n' +
              '      <ul></ul>\n' +
              '    </div>\n' +
              '    <div class="resume-entry">\n' +
              '      <h5>Jamestown Community College<span  class="resume-side-text float-right">Aug. 2011 - May 2013</span></h5>\n' +
              '      <h6>Computer Science, A.S.<span  class="resume-side-text float-right">Olean, NY</span></h6>\n' +
              '      <ul></ul>\n' +
              '    </div>\n' +
              '\n' +
              '  </div>\n' +
              '\n' +
              '  <div class="resume-work">\n' +
              '    <h4>Work Experience</h4>\n' +
              '    <hr />\n' +
              '    <div class="resume-entry">\n' +
              '      <h5>Disney Streaming Services<span  class="resume-side-text float-right">April 2017 - Present</span></h5>\n' +
              '      <h6>Associate Software Engineer<span  class="resume-side-text float-right">New York, NY</span></h6>\n' +
              '      <ul>\n' +
              '        <li>Develop content delivery applications to suit web, mobile, and connected-device application needs</li>\n' +
              '        <li>Design and implement AWS architecture and deployment strategies for emerging applications</li>\n' +
              '        <li>Support and develop new features for Homebase, a CMS system used by hundreds daily (developed in Java and rendered in a proprietary Javascript framework)</li>\n' +
              '        <li>Developed Zodiac, an event-driven Spring Boot application that asynchronously ingests and transforms legacy partner XML data files into a newer content pipeline</li>\n' +
              '        <li>Developed and led design of Skybox, a user-facing administrative application designed to report system status that tracks transactions through various content pipeline applications (developed in Node.js/Angular 5)</li>\n' +
              '        <li>Developed and participated in design of Polaris, a newly built user-facing CMS system designed to manage media metadata within the content delivery pipeline (developed in Angular 6/Node.js/Microservices backend)</li>\n' +
              '      </ul>\n' +
              '    </div>\n' +
              '    <div class="resume-entry">\n' +
              '      <h5>ACI Worldwide<span  class="resume-side-text float-right">June 2016 - April 2017</span></h5>\n' +
              '      <h6>Associate Software Engineer<span  class="resume-side-text float-right">East Brunswick, NJ</span></h6>\n' +
              '      <ul>\n' +
              '        <li>Supported and developed new features for ReD Shield, a transactional risk analytics engine designed to determine whether or not a credit card transaction is fraudulent (written primarily in C/Pro*C)</li>\n' +
              '        <li>Developed Spring Boot REST microservice to arbitrarily convert currencies based on the latest reported exchange rates and integrated this service with ReD Shield</li>\n' +
              '        <li>Migrated manually-deployed legacy systems to automated Jenkins pipeline</li>\n' +
              '        <li>Developed Zodiac, an event-driven Spring Boot application that asynchronously ingests and transforms legacy partner XML data files into a newer content pipeline</li>\n' +
              '        <li>Wrote shell scripts to automate build/deployment processes for software modules</li>\n' +
              '      </ul>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '\n' +
              '  <div class="resume-projects">\n' +
              '    <h4>Projects</h4>\n' +
              '    <hr />\n' +
              '    <div class="resume-entry">\n' +
              '      <h5>Kevin Gilbert Scholarship Fund<span  class="resume-side-text float-right">April 2017 - Present</span></h5>\n' +
              '      <h6>Web App</h6>\n' +
              '      <ul>\n' +
              '        <li>Web application developed in Node.js/Angular 5</li>\n' +
              '        <li>Form-driven team registration page that allows users to build teams and pay admission fees electronically</li>\n' +
              '        <li>Firebase backend database used to store and retrieve registered teams</li>\n' +
              '      </ul>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '\n' +
              '  <div class="resume-skills">\n' +
              '    <h4>Skills</h4>\n' +
              '    <hr />\n' +
              '    <div class="row">\n' +
              '      <div class="col-md-6 col-12">\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>Languages</h5>\n' +
              '          <span class="badge badge-pill badge-dark">Java</span>\n' +
              '          <span class="badge badge-pill badge-dark">Javascript</span>\n' +
              '          <span class="badge badge-pill badge-dark">Typescript</span>\n' +
              '          <span class="badge badge-pill badge-dark">Scala</span>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '      <div class="col-md-6 col-12">\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>Frameworks</h5>\n' +
              '          <span class="badge badge-pill badge-dark">Spring Boot</span>\n' +
              '          <span class="badge badge-pill badge-dark">Node.js/Express</span>\n' +
              '          <span class="badge badge-pill badge-dark">Angular</span>\n' +
              '          <span class="badge badge-pill badge-dark">Akka</span>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '    </div>\n' +
              '    <div class="row">\n' +
              '      <div class="col-md-6 col-12">\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>Database</h5>\n' +
              '          <span class="badge badge-pill badge-dark">Oracle</span>\n' +
              '          <span class="badge badge-pill badge-dark">Postgres</span>\n' +
              '          <span class="badge badge-pill badge-dark">MongoDB</span>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '      <div class="col-md-6 col-12">\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>Web/Markup</h5>\n' +
              '          <span class="badge badge-pill badge-dark">HTML</span>\n' +
              '          <span class="badge badge-pill badge-dark">CSS</span>\n' +
              '          <span class="badge badge-pill badge-dark">SASS</span>\n' +
              '          <span class="badge badge-pill badge-dark">Bootstrap</span>\n' +
              '          <span class="badge badge-pill badge-dark">XSLT</span>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '    </div>\n' +
              '    <div class="row">\n' +
              '      <div class="col-md-6 col-12">\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>Cloud</h5>\n' +
              '          <span class="badge badge-pill badge-dark">AWS</span>\n' +
              '          <span class="badge badge-pill badge-dark">Firebase</span>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '      <div class="col-md-6 col-12">\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>Continuos Integration/Deployment</h5>\n' +
              '          <span class="badge badge-pill badge-dark">Docker</span>\n' +
              '          <span class="badge badge-pill badge-dark">Jenkins</span>\n' +
              '          <span class="badge badge-pill badge-dark">Rundeck</span>\n' +
              '          <span class="badge badge-pill badge-dark">Puppet</span>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '</div>\n']
            }
          }
        },
        portfolio : {
          name: 'portfolio',
          type : 'dir',
          requireSudo: false,
          parent: '/',
          ref : {
            'portfolio.html': {
              name: 'portfolio.html',
              type: 'file',
              text: ['<div class="card-deck">\n' +
              '  <div class="card bg-light">\n' +
              '    <img class="card-img-top" src="assets/img/ktg-site.png" alt="ktg fun logo">\n' +
              '    <div class="card-vanity-bar"></div>\n' +
              '    <div class="card-body">\n' +
              '      <h4 class="card-title">Kevin Gilbert Scholarship Fund</h4>\n' +
              '      <p class="card-text">A website for the KTG Scholarship Fund. Built in Angular6+/Node.js. Allows users to register and pay admission fees electronically.</p>\n' +
              '      <a href="https://www.ktgscholarshipfund.com/about" class="card-link">Website</a>\n' +
              '      <a href="https://github.com/deadlymustard/kgscholarshipfund" class="card-link">Github <i class="fa fa-github" aria-hidden="true"></i></a>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '  <div class="card bg-light">\n' +
              '    <img class="card-img-top" src="assets/img/angular.png" alt="portfolio site screenshot">\n' +
              '    <div class="card-vanity-bar"></div>\n' +
              '    <div class="card-body">\n' +
              '      <h4 class="card-title">Portfolio Site</h4>\n' +
              '      <p class="card-text">\n' +
              '        Believe it or not this website took some work.\n' +
              '        There\'s some fun easter eggs hidden throughout.\n' +
              '        Think with your stomach and you\'ll get to the root of the problem. Peeking at Github is cheating!\n' +
              '      </p>\n' +
              '      <a href="https://www.reganshaner.com" class="card-link">Website</a>\n' +
              '      <a href="https://github.com/deadlymustard/portfolio-site" class="card-link">Github <i class="fa fa-github" aria-hidden="true"></i></a>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '  <div class="card bg-light">\n' +
              '    <img class="card-img-top" src="assets/img/lightbox.png" alt="portfolio site screenshot">\n' +
              '    <div class="card-vanity-bar"></div>\n' +
              '    <div class="card-body">\n' +
              '      <h4 class="card-title">Stranger Things Lightbox</h4>\n' +
              '      <p class="card-text">\n' +
              '        My initial foray into Arduino made as a gift. A light box relying on customizable LED strings.\n' +
              '        Input messages with your phone via a bluetooth terminal and it\'ll spell it out. Coded in C, held together with duct-tape and hope.\n' +
              '      </p>\n' +
              '      <a href="https://www.youtube.com" class="card-link">Video <i class="fa fa-youtube" aria-hidden="true"></i></a>\n' +
              '      <a href="https://github.com/deadlymustard/portfolio-site" class="card-link">Github <i class="fa fa-github" aria-hidden="true"></i></a>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '</div>\n']
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
