var scrollToRevealArray = document.querySelectorAll(".scroll-to-reveal");
var ctaBtn = document.querySelector(".cta");
var mobileList = document.querySelector(".mobile-list");
var navIcon = document.querySelector(".nav--icon");
var btns = document.querySelectorAll(".js-btn");
var mobilebtns = document.querySelectorAll(".js-mobile-btn");
var sections = document.querySelectorAll(".js-section");
var slider = tns({
  container: ".slide__container",
  arrowKeys: true,
  controlsText: [
    '<i class="fas fa-angle-left"></i>',
    '<i class="fas fa-angle-right"></i>'
  ],
  nav: false
});

//in page scrolling for documentaiton page
function setActiveLink(event, buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }
  event.target.classList.add("selected");
}

function smoothScrollTo(i, buttons, event) {
  var element = sections[i - 1] || sections[i - 8];
  setActiveLink(event, buttons);

  if (mobileList.classList.contains("show")) {
    mobileList.classList.toggle("show");
  }

  window.scrollTo({
    behavior: "smooth",
    top: element.offsetTop - 100,
    left: 0
  });
}

for (var i = 0; i < scrollToRevealArray.length; i++) {
  var waypoint = new Waypoint({
    element: scrollToRevealArray[i],
    handler: function(direction) {
      this.element.classList.add("fadeInUp");
    },
    offset: Waypoint.viewportHeight()
  });
}

new Waypoint({
  element: ctaBtn,
  handler: function(direction) {
    if (direction === "down") {
      document.querySelector("nav").classList.add("fixed");
    } else {
      document.querySelector("nav").classList.remove("fixed");
    }
  },
  offset: -80
});

if (btns.length && sections.length > 0) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", smoothScrollTo.bind(this, i, btns));
  }
}

if (mobilebtns.length && sections.length > 0) {
  for (var i = 0; i < mobilebtns.length; i++) {
    mobilebtns[i].addEventListener(
      "click",
      smoothScrollTo.bind(this, i, mobilebtns)
    );
  }
}

navIcon.addEventListener("click", function() {
  document.querySelector(".mobile-list").classList.toggle("show");
});


function getWeeksArray() {
  var weekArray = [];
  for (var i = 0; i < 30; i++) {
    weekArray.push("3/" + i);
  }
  return weekArray;
}

function getGeneratedLineData(numbers) {
  return {
    labels: getWeeksArray(),
    datasets: [
      {
        borderColor: "#b69792",
        pointColor: "#966760",
        data: numbers,
        pointRadius: 4,
        borderWidth: 1,
        pointBackgroundColor: "#b69792"
      }
    ]
  };
}

function getGeneratedBarData(numbers) {
  var labels = getWeeksArray();
  return {
    labels: getWeeksArray(),
    datasets: [
      {
        labels: labels,
        backgroundColor: "rgba(255, 241, 221, 0.76)",
        data: numbers
      }
    ]
  };
}

function randomArray(length, max) {
  return Array.apply(null, Array(length)).map(function() {
    return Math.round(Math.random() * max);
  });
}

for (var i = 0; i < 6; i++) {
  var ctx = document.getElementById("stats-" + i).getContext("2d");
  var type, dataType;

  if (i !== 1 && i !== 4) {
    type = "line";
    dataType = getGeneratedLineData(randomArray(30, 1000));
  } else {
    type = "bar";
    dataType = getGeneratedBarData(randomArray(30, 1000));
  }

  new Chart(ctx, {
    type: type,
    data: dataType,
    scaleShowVerticalLines: false,
    scaleGridLineColor: "black",
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#fff1dd",
              fontSize: 14
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "#fff1dd",
              fontSize: 14
            }
          }
        ]
      }
    }
  });
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
