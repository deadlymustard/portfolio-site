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
              '  If you want to get to know me better, feel free to message me on <a href="https://www.linkedin.com/in/regan-shaner-93b14a97/">LinkedIn</a> or via <a href="mailto:regdshaner@gmail.com">email</a>. If we have similar interests or mindset I’d love to chat.\n' +
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
              text: ['<div class="resume-wrapper"> \n' +
              '    <div class="resume-header"> \n' +
              '        <p>Regan D. Shaner</p> \n' +
              '        <p>New York, NY</p> \n' +
              '      </div> \n' +
              '   \n' +
              '    <div class="resume-education"> \n' +
              '        <h4>Education</h4> \n' +
              '        <hr /> \n' +
              '        <div class="resume-entry"> \n' +
              '            <h5>Rutgers University<span  class="resume-side-text float-right">Aug. 2013 - May 2016</span></h5> \n' +
              '            <h6>Computer Science, B.S.<span  class="resume-side-text float-right">New Brunswick, NJ</span></h6> \n' +
              '            <ul></ul> \n' +
              '          </div> \n' +
              '        <div class="resume-entry"> \n' +
              '            <h5>Jamestown Community College<span  class="resume-side-text float-right">Aug. 2011 - May 2013</span></h5> \n' +
              '            <h6>Computer Science, A.S.<span  class="resume-side-text float-right">Olean, NY</span></h6> \n' +
              '            <ul></ul> \n' +
              '          </div> \n' +
              '     \n' +
              '      </div> \n' +
              '   \n' +
              '    <div class="resume-work"> \n' +
              '        <h4>Work Experience</h4> \n' +
              '        <hr /> \n' +
              '        <div class="resume-entry"> \n' +
              '            <h5>Disney Streaming Services<span  class="resume-side-text float-right">April 2017 - Present</span></h5> \n' +
              '            <h6>Full Stack Software Engineer<span  class="resume-side-text float-right">New York, NY</span></h6>\n' +
              '            <ul> \n' +
              '                <li>Designed and implemented AWS architecture solutions for new applications with a focus on multi-region scaling/fallback.</li>\n' +
              '                <li>Implemented CI solutions in Jenkins to deploy new applications.</li>\n' +
              '                <li>Supported and developed new features for a content management system used to manage live video streaming content and websites. Leveraged Java and a custom internal JavaScript framework.</li>\n' +
              '                <li>Created an operational dashboard using Node.js/Angular to manage common administrative tasks within our organization’s content pipeline.</li>\n' +
              '                <li>Developed an event-driven Spring Boot application to asynchronously ingest and transform legacy partner data into a newer content pipeline.</li>\n' +
              '                <li>Developed a new content management system using Node.js and Angular to drive editorial curation, content scheduling, and operational tooling on an upcoming Disney Streaming product.</li>\n' +
              '              </ul> \n' +
              '          </div> \n' +
              '        <div class="resume-entry"> \n' +
              '            <h5>ACI Worldwide<span  class="resume-side-text float-right">June 2016 - April 2017</span></h5> \n' +
              '            <h6>Associate Software Engineer<span  class="resume-side-text float-right">East Brunswick, NJ</span></h6> \n' +
              '            <ul> \n' +
              '                <li>Supported and developed new features for a transactional risk analytics engine designed to determine whether or not a credit card transaction is fraudulent. Written primarily in C/Pro*C.</li>\n' +
              '                <li>Developed a Spring Boot REST microservice to convert currencies based on the latest reported exchange rates. Integrated this service with our existing systems.</li>\n' +
              '                <li>Migrated manually-deployed legacy systems to automated Jenkins pipeline.</li>\n' +
              '                <li>Wrote shell scripts to automate build/deployment processes for software modules.</li>\n' +
              '              </ul> \n' +
              '          </div> \n' +
              '      </div> \n' +
              '   \n' +
              '    <div class="resume-projects"> \n' +
              '        <h4>Projects</h4> \n' +
              '        <hr /> \n' +
              '        <div class="resume-entry"> \n' +
              '            <h5>Kevin Gilbert Scholarship Fund<span  class="resume-side-text float-right">April 2017 - Present</span></h5> \n' +
              '            <h6>Web Application</h6>\n' +
              '            <ul> \n' +
              '                <li>Basic website developed in Node.js/Angular containing information about the fundraising events.</li>\n' +
              '                <li>Form-driven team registration page that allows users to build teams and pay admission fees electronically</li> \n' +
              '                <li>Firebase backend database used to store and retrieve registered teams</li> \n' +
              '              </ul> \n' +
              '        </div>\n' +
              '        <div class="resume-entry">\n' +
              '          <h5>RUClean<span  class="resume-side-text float-right">March 2016 - May 2016</span></h5>\n' +
              '          <h6>Android Application</h6>\n' +
              '          <ul>\n' +
              '            <li>Android application that allows reporting incidences of trash/pollution within municipalities.</li>\n' +
              '            <li>Created a data model for tags containing geotagged locations and photos for user reporting. Indexed by geohash in DynamoDB.</li>\n' +
              '            <li>Created map view that showed all user contributions within a radius of the client.</li>\n' +
              '          </ul>\n' +
              '        </div>\n' +
              '    </div>\n' +
              '   \n' +
              '    <div class="resume-skills"> \n' +
              '        <h4>Skills</h4> \n' +
              '        <hr /> \n' +
              '        <div class="row"> \n' +
              '            <div class="col-md-6 col-12"> \n' +
              '                <div class="resume-entry"> \n' +
              '                    <h5>Languages</h5> \n' +
              '                    <span class="badge badge-pill badge-dark">Java</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Javascript</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Typescript</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Scala</span> \n' +
              '                  </div> \n' +
              '              </div> \n' +
              '            <div class="col-md-6 col-12"> \n' +
              '                <div class="resume-entry"> \n' +
              '                    <h5>Frameworks</h5> \n' +
              '                    <span class="badge badge-pill badge-dark">Spring Boot</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Node.js/Express</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Angular</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Akka</span> \n' +
              '                  </div> \n' +
              '              </div> \n' +
              '          </div> \n' +
              '        <div class="row"> \n' +
              '            <div class="col-md-6 col-12"> \n' +
              '                <div class="resume-entry"> \n' +
              '                    <h5>Database</h5> \n' +
              '                    <span class="badge badge-pill badge-dark">Oracle</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Postgres</span> \n' +
              '                    <span class="badge badge-pill badge-dark">MongoDB</span> \n' +
              '                  </div> \n' +
              '              </div> \n' +
              '            <div class="col-md-6 col-12"> \n' +
              '                <div class="resume-entry"> \n' +
              '                    <h5>Web/Markup</h5> \n' +
              '                    <span class="badge badge-pill badge-dark">HTML</span> \n' +
              '                    <span class="badge badge-pill badge-dark">CSS</span> \n' +
              '                    <span class="badge badge-pill badge-dark">SASS</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Bootstrap</span> \n' +
              '                    <span class="badge badge-pill badge-dark">XSLT</span> \n' +
              '                  </div> \n' +
              '              </div> \n' +
              '          </div> \n' +
              '        <div class="row"> \n' +
              '            <div class="col-md-6 col-12"> \n' +
              '                <div class="resume-entry"> \n' +
              '                    <h5>Cloud</h5> \n' +
              '                    <span class="badge badge-pill badge-dark">AWS</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Firebase</span> \n' +
              '                  </div> \n' +
              '              </div> \n' +
              '            <div class="col-md-6 col-12"> \n' +
              '                <div class="resume-entry"> \n' +
              '                    <h5>Continuos Integration/Deployment</h5> \n' +
              '                    <span class="badge badge-pill badge-dark">Docker</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Jenkins</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Rundeck</span> \n' +
              '                    <span class="badge badge-pill badge-dark">Puppet</span> \n' +
              '                  </div> \n' +
              '              </div> \n' +
              '          </div> \n' +
              '      </div> \n' +
              '  </div>']
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
              '      <a href="https://github.com/deadlymustard/scholarshipfund_angular4" class="card-link">Github <i class="fa fa-github" aria-hidden="true"></i></a>\n' +
              '    </div>\n' +
              '  </div>\n' +
              '  <div class="card bg-light">\n' +
              '    <img class="card-img-top" src="assets/img/portfolio-site.png" alt="portfolio site screenshot">\n' +
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
              '      <a href="https://youtu.be/AKgYrc6qQj44" class="card-link">Video <i class="fa fa-youtube" aria-hidden="true"></i></a>\n' +
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
