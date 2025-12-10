const SEASONS = [
  {
    id: "season1",
    label: "SEASON 1",
    seriesName: "PERFORMANCE SPORTS CAR CUP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Kevin", team: "Alfa Romeo", points: [21, 32, 21, 17, 17, 22] },
      { driver: "Robin", team: "Alfa Romeo", points: [29, 18, 32, 28, 25, 28] },
      { driver: "CZ", team: "BMW", points: [16, 20, 14, 25, 28, 20] },
      { driver: "Makka", team: "BMW", points: [14, 13, 16, 13, 13, 13] }
    ],
    gallery: [
      "./assets/images/season_images/S1/S1R2_Start.png"
    ]
  },
  {
    id: "season2",
    label: "SEASON 2",
    seriesName: "TOURING CAR CUP I",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "CZ", team: "MG", points: [22, 27, 18, null, null, null] },
      { driver: "Kevin", team: "MG", points: [18, 19, 22, null, null, null] },
      { driver: "Makka", team: "Lynk & Co", points: [14, 14, 14, null, null, null] },
      { driver: "Robin", team: "Lynk & Co", points: [29, 23, 29, null, null, null] }
    ],
    gallery: [
      "./assets/images/season_images/S2/S2R2_Start.png"
    ]
  },
  {
    id: "season3",
    label: "SEASON 3",
    seriesName: "TOURING CAR CUP II",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Joseph", team: "Hyundai", points: [14, 14, 16, 14, 26, 14] },
      { driver: "Robin", team: "Hyundai", points: [23, 27, 29, 29, 18, 28] },
      { driver: "CZ", team: "Audi", points: [25, 23, 20, 18, 14, 18] },
      { driver: "Kevin", team: "Audi", points: [19, 19, 18, 22, 25, 23] }
    ],
    gallery: [
      "./assets/images/season_images/S3/S3R1_Start.png",
      "./assets/images/season_images/S3/S3R2_Start.png",
      "./assets/images/season_images/S3/S3R1_Start_02.png",
      "./assets/images/season_images/S3/S3R2_KevinVRobin.png"
    ]
  },
  {
    id: "season4",
    label: "SEASON 4",
    seriesName: "VINTAGE MODIFIED CUP",
    races: [
      { name: "Mid-Ohio", flag: "./assets/images/flag/united-states.png" },
      { name: "Laguna Seca", flag: "./assets/images/flag/united-states.png" },
      { name: "New Hampshire Motor Speedway", flag: "./assets/images/flag/united-states.png" },
      { name: "Virginia International Raceway", flag: "./assets/images/flag/united-states.png" },
    ],
    standings: [
      { driver: "CZ", team: "Toyota", points: [23, 27, 24, 28] },
      { driver: "Robin", team: "Toyota", points: [25, 22, 20, 20] },
      { driver: "Joseph", team: "Lotus", points: [14, 19, 22, 18] },
      { driver: "Kevin", team: "Lotus", points: [21, 15, 17, 17] },
      { driver: "Bryan", team: "Mazda", points: ["DNF", "DNF", "DNF", "DNF"] }
    ],
    gallery: [
      "./assets/images/season_images/S4/S4R1_Start.png",
      "./assets/images/season_images/S4/S4R1_Start_02.png",
      "./assets/images/season_images/S4/S4R1_Start_03.png",
      "./assets/images/season_images/S4/S4R2_Rain_film.jpg"
    ]
  },
  {
    id: "season5",
    label: "SEASON 5",
    seriesName: "KTM SPEC SPRINT CUP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Laguna Seca", flag: "./assets/images/flag/united-states.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Robin", team: "KTM", points: [27, 24, 24, 23, 24, 29] },
      { driver: "Joseph", team: "KTM", points: [20, 18, 25, 14, 27, 20] },
      { driver: "Kevin", team: "KTM", points: [22, 27, 20, 18, 17, 15] },
      { driver: "Bryan", team: "KTM", points: [14, 14, 14, 28, 16, 19] }
    ],
    gallery: [
      "./assets/images/season_images/S5/S5R4_Start.png",
      "./assets/images/season_images/S5/S5R5_Start.png"
    ]
  },
  {
    id: "season6",
    label: "SEASON 6",
    seriesName: "GT3 CHAMPIONSHIP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Bryan", team: "Aston Martin", points: [20, 26, 28, null, null, null] },
      { driver: "Robin", team: "Cadillac", points: [27, 17, 23, null, null, null] },
      { driver: "Kevin", team: "Acura", points: [20, 23, 16, null, null, null] },
      { driver: "Joseph", team: "AMG", points: [16, 15, 14, null, null, null] },
      { driver: "CZ", team: "Audi", points: [11, 13, 2, null, null, null] },
      { driver: "Daniel", team: "Ferrari", points: ["DNF", "DNF", "DNF", null, null, null] },
      { driver: "Billy", team: "Lexus", points: ["DNF", "DNF", "DNF", null, null, null] }
    ],
    gallery: [
      "./assets/images/season_images/S6/S6R1_Start.png",
      "./assets/images/season_images/S6/S6R2_CloseFinish.png",
      "./assets/images/season_images/S6/S6R2_No2to5.png"
    ]
  },
  {
    id: "season7",
    label: "SEASON 7",
    seriesName: "RENAULT CLIO CUP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Laguna Seca", flag: "./assets/images/flag/united-states.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Bryan", team: "Renault", points: [29, 28, 20, null, null, null] },
      { driver: "Robin", team: "Renault", points: [22, 23, 28, null, null, null] },
      { driver: "Joseph", team: "Renault", points: [18, 18, 15, null, null, null] },
      { driver: "CZ", team: "Renault", points: [14, 14, 20, null, null, null] },
      { driver: "Nanako", team: "Renault", points: ["DNF", "DNF", 11, null, null, null] },
      { driver: "Makka", team: "Renault", points: ["DNF", 11, "DNF", null, null, null] }
    ],
    gallery: [] // S7 directory is empty
  }
];