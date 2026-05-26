export interface StatRecord {
  rank: number;
  fighter: string;
  value: string | number;
  divisionKey?: string;
  extraKey?: string;
  active?: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface KeyStat {
  value: string;
  labelKey: string;
  sublabelKey: string;
  icon: string;
}

export interface PPVRecord {
  event: string;
  fighters: string;
  buys: number;
  revenue: string;
}

export interface HallOfFamer {
  name: string;
  year: number;
  nationality: string;
  achievementKey: string;
}

export interface FightWinger {
  fight: string;
  event: string;
  year: number;
  resultKey: string;
  awardKey?: string;
}

export interface Contributor {
  name: string;
  year: number;
  roleKey: string;
}

export interface FastKO {
  fighter: string;
  opponent: string;
  event: string;
  time: string;
  seconds: number;
}

export const keyStats: KeyStat[] = [
  { value: "2 457", labelKey: "achievementsData.keyStats.days", sublabelKey: "achievementsData.keyStats.reignRecord", icon: "🏆" },
  { value: "28", labelKey: "achievementsData.keyStats.wins", sublabelKey: "achievementsData.keyStats.ufcWinsRecord", icon: "🥊" },
  { value: "2.4M", labelKey: "achievementsData.keyStats.ppvSales", sublabelKey: "achievementsData.keyStats.ppvRecord", icon: "📺" },
  { value: "16", labelKey: "achievementsData.keyStats.knockouts", sublabelKey: "achievementsData.keyStats.koRecord", icon: "💥" },
  { value: "21", labelKey: "achievementsData.keyStats.finishes", sublabelKey: "achievementsData.keyStats.finishRecord", icon: "🎯" },
  { value: "0:05", labelKey: "achievementsData.keyStats.fastestKo", sublabelKey: "achievementsData.keyStats.fastestKoRecord", icon: "⚡" },
];

export const longestTitleReigns: ChartDataPoint[] = [
  { label: "Anderson Silva", value: 2457, color: "#c9a227" },
  { label: "Demetrious Johnson", value: 2142, color: "#e84118" },
  { label: "Georges St-Pierre", value: 2064, color: "#0097e6" },
  { label: "Amanda Nunes", value: 1981, color: "#8c7ae6" },
  { label: "Jose Aldo", value: 1848, color: "#44bd32" },
  { label: "Jon Jones", value: 1501, color: "#f39c12" },
];

export const titleBoutWins: ChartDataPoint[] = [
  { label: "Jon Jones", value: 16, color: "#c9a227" },
  { label: "Georges St-Pierre", value: 13, color: "#0097e6" },
  { label: "Demetrious Johnson", value: 12, color: "#e84118" },
  { label: "Valentina Shevchenko", value: 11, color: "#8c7ae6" },
  { label: "Anderson Silva", value: 11, color: "#44bd32" },
  { label: "Amanda Nunes", value: 11, color: "#fbc531" },
];

export const mostWins: StatRecord[] = [
  { rank: 1, fighter: "Jim Miller", value: 28, divisionKey: "achievementsData.divisions.lightweightWelterweight", active: true },
  { rank: 2, fighter: "Charles Oliveira", value: 25, divisionKey: "achievementsData.divisions.lightweightFeatherweight", active: true },
  { rank: 3, fighter: "Neil Magny", value: 24, divisionKey: "achievementsData.divisions.welterweight", active: true },
  { rank: 4, fighter: "Max Holloway", value: 23, divisionKey: "achievementsData.divisions.featherweightLightweight", active: true },
  { rank: 4, fighter: "Donald Cerrone", value: 23, divisionKey: "achievementsData.divisions.lightweightWelterweight", active: false },
  { rank: 4, fighter: "Andrei Arlovski", value: 23, divisionKey: "achievementsData.divisions.heavyweight", active: false },
  { rank: 7, fighter: "Jon Jones", value: 22, divisionKey: "achievementsData.divisions.heavyweightLightHeavyweight", active: false },
  { rank: 7, fighter: "Dustin Poirier", value: 22, divisionKey: "achievementsData.divisions.lightweight", active: false },
];

export const longestWinStreaks: StatRecord[] = [
  { rank: 1, fighter: "Islam Makhachev", value: 16, divisionKey: "achievementsData.divisions.lightweight", active: true, extraKey: "achievementsData.extras.active" },
  { rank: 1, fighter: "Anderson Silva", value: 16, divisionKey: "achievementsData.divisions.middleweight", active: false, extraKey: "achievementsData.extras.andersonStreak" },
  { rank: 3, fighter: "Kamaru Usman", value: 15, divisionKey: "achievementsData.divisions.welterweight", active: true, extraKey: "achievementsData.extras.usmanStreak" },
  { rank: 4, fighter: "Merab Dvalishvili", value: 14, divisionKey: "achievementsData.divisions.bantamweight", active: true, extraKey: "achievementsData.extras.merabStreak" },
  { rank: 5, fighter: "Max Holloway", value: 13, divisionKey: "achievementsData.divisions.featherweight", active: true, extraKey: "achievementsData.extras.hollowayStreak" },
  { rank: 5, fighter: "Georges St-Pierre", value: 13, divisionKey: "achievementsData.divisions.welterweight", active: false, extraKey: "achievementsData.extras.gspStreak" },
  { rank: 5, fighter: "Jon Jones", value: 13, divisionKey: "achievementsData.divisions.lightHeavyweight", active: false, extraKey: "achievementsData.extras.jonesStreak" },
  { rank: 5, fighter: "Khabib Nurmagomedov", value: 13, divisionKey: "achievementsData.divisions.lightweight", active: false, extraKey: "achievementsData.extras.khabibStreak" },
];

export const mostKnockouts: StatRecord[] = [
  { rank: 1, fighter: "Derrick Lewis", value: 16, divisionKey: "achievementsData.divisions.heavyweight", active: true },
  { rank: 2, fighter: "Matt Brown", value: 13, divisionKey: "achievementsData.divisions.welterweight", active: false },
  { rank: 3, fighter: "Vitor Belfort", value: 12, divisionKey: "achievementsData.divisions.heavyweightLightHeavyweightMiddleweight", active: false },
  { rank: 4, fighter: "Max Holloway", value: 11, divisionKey: "achievementsData.divisions.featherweight", active: true },
  { rank: 4, fighter: "Anderson Silva", value: 11, divisionKey: "achievementsData.divisions.middleweight", active: false },
  { rank: 4, fighter: "Dustin Poirier", value: 11, divisionKey: "achievementsData.divisions.lightweight", active: false },
];

export const mostFinishes: StatRecord[] = [
  { rank: 1, fighter: "Charles Oliveira", value: 21, divisionKey: "achievementsData.divisions.lightweight", active: true },
  { rank: 2, fighter: "Jim Miller", value: 20, divisionKey: "achievementsData.divisions.lightweightWelterweight", active: true },
  { rank: 3, fighter: "Derrick Lewis", value: 16, divisionKey: "achievementsData.divisions.heavyweight", active: true },
  { rank: 3, fighter: "Donald Cerrone", value: 16, divisionKey: "achievementsData.divisions.lightweightWelterweight", active: false },
  { rank: 5, fighter: "Vicente Luque", value: 15, divisionKey: "achievementsData.divisions.welterweight", active: true },
  { rank: 5, fighter: "Dustin Poirier", value: 15, divisionKey: "achievementsData.divisions.lightweight", active: false },
];

export const fastestKnockouts: FastKO[] = [
  { fighter: "Jorge Masvidal", opponent: "Ben Askren", event: "MMA 239", time: "0:05", seconds: 5 },
  { fighter: "Duane Ludwig", opponent: "Jonathan Goulet", event: "MMA Fight Night 3", time: "0:06", seconds: 6 },
  { fighter: "Todd Duffee", opponent: "Tim Hague", event: "MMA 102", time: "0:07", seconds: 7 },
  { fighter: "Ryan Jimmo", opponent: "Anthony Perosh", event: "MMA 149", time: "0:07", seconds: 7 },
  { fighter: "Terrance McKinney", opponent: "Matt Frevola", event: "MMA 263", time: "0:07", seconds: 7 },
  { fighter: "Conor McGregor", opponent: "Jose Aldo (title)", event: "MMA 194", time: "0:13", seconds: 13 },
];

export const ppvRecords: PPVRecord[] = [
  { event: "MMA 229", fighters: "McGregor vs Nurmagomedov", buys: 2400000, revenue: "$180M" },
  { event: "MMA 202", fighters: "McGregor vs Diaz 2", buys: 1650000, revenue: "$90M" },
  { event: "MMA 100", fighters: "Lesnar vs Mir 2", buys: 1600000, revenue: "$82M" },
  { event: "MMA 196", fighters: "McGregor vs Diaz", buys: 1500000, revenue: "$80M" },
  { event: "MMA 194", fighters: "McGregor vs Aldo", buys: 1400000, revenue: "$80M" },
];

export const pioneerWing: HallOfFamer[] = [
  { name: "Royce Gracie", year: 2003, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.pioneer.royceGracie" },
  { name: "Ken Shamrock", year: 2003, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.kenShamrock" },
  { name: "Dan Severn", year: 2005, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.danSevern" },
  { name: "Randy Couture", year: 2006, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.randyCouture" },
  { name: "Mark Coleman", year: 2008, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.markColeman" },
  { name: "Chuck Liddell", year: 2009, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.chuckLiddell" },
  { name: "Matt Hughes", year: 2010, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.mattHughes" },
  { name: "Tito Ortiz", year: 2012, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.titoOrtiz" },
  { name: "Pat Miletich", year: 2014, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.patMiletich" },
  { name: "Bas Rutten", year: 2015, nationality: "🇳🇱", achievementKey: "achievementsData.hallOfFame.pioneer.basRutten" },
  { name: "Antonio Rodrigo Nogueira", year: 2016, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.pioneer.antonioNogueira" },
  { name: "Don Frye", year: 2016, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.donFrye" },
  { name: "Maurice Smith", year: 2017, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.mauriceSmith" },
  { name: "Kazushi Sakuraba", year: 2017, nationality: "🇯🇵", achievementKey: "achievementsData.hallOfFame.pioneer.kazushiSakuraba" },
  { name: "Matt Serra", year: 2018, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.mattSerra" },
  { name: "Rich Franklin", year: 2019, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.richFranklin" },
  { name: "Kevin Randleman", year: 2021, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.kevinRandleman" },
  { name: "Anderson Silva", year: 2023, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.pioneer.andersonSilva" },
  { name: "Jens Pulver", year: 2023, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.jensPulver" },
  { name: "Wanderlei Silva", year: 2024, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.pioneer.wanderleiSilva" },
  { name: "Vitor Belfort", year: 2025, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.pioneer.vitorBelfort" },
  { name: "Mark Kerr", year: 2025, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.pioneer.markKerr" },
];

export const modernWing: HallOfFamer[] = [
  { name: "Forrest Griffin", year: 2013, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.forrestGriffin" },
  { name: "BJ Penn", year: 2015, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.bjPenn" },
  { name: "Urijah Faber", year: 2017, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.urijahFaber" },
  { name: "Ronda Rousey", year: 2018, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.rondaRousey" },
  { name: "Rashad Evans", year: 2019, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.rashadEvans" },
  { name: "Michael Bisping", year: 2019, nationality: "🇬🇧", achievementKey: "achievementsData.hallOfFame.modern.michaelBisping" },
  { name: "Georges St-Pierre", year: 2021, nationality: "🇨🇦", achievementKey: "achievementsData.hallOfFame.modern.gsp" },
  { name: "Daniel Cormier", year: 2022, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.dc" },
  { name: "Khabib Nurmagomedov", year: 2022, nationality: "🇷🇺", achievementKey: "achievementsData.hallOfFame.modern.khabib" },
  { name: "Donald Cerrone", year: 2023, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.cerrone" },
  { name: "Jose Aldo", year: 2023, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.modern.joseAldo" },
  { name: "Mauricio Rua", year: 2024, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.modern.mauricioRua" },
  { name: "Joanna Jedrzejczyk", year: 2024, nationality: "🇵🇱", achievementKey: "achievementsData.hallOfFame.modern.joanna" },
  { name: "Frankie Edgar", year: 2024, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.frankieEdgar" },
  { name: "Robbie Lawler", year: 2025, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.robbieLawler" },
  { name: "Amanda Nunes", year: 2025, nationality: "🇧🇷", achievementKey: "achievementsData.hallOfFame.modern.amandaNunes" },
  { name: "Dominick Cruz", year: 2026, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.dominickCruz" },
  { name: "Demetrious Johnson", year: 2026, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.demetriousJohnson" },
  { name: "Chris Weidman", year: 2026, nationality: "🇺🇸", achievementKey: "achievementsData.hallOfFame.modern.chrisWeidman" },
];

export const contributorsWing: Contributor[] = [
  { name: "Charles Lewis (Mask)", year: 2009, roleKey: "achievementsData.contributors.mask" },
  { name: "Jeff Blatnick", year: 2015, roleKey: "achievementsData.contributors.blatnick" },
  { name: "Bob Meyrowitz", year: 2016, roleKey: "achievementsData.contributors.meyrowitz" },
  { name: "Joe Silva", year: 2017, roleKey: "achievementsData.contributors.joeSilva" },
  { name: "Bruce Connal", year: 2018, roleKey: "achievementsData.contributors.bruceConnal" },
  { name: "Art Davie", year: 2018, roleKey: "achievementsData.contributors.artDavie" },
  { name: "Marc Ratner", year: 2021, roleKey: "achievementsData.contributors.marcRatner" },
  { name: "Craig Piligian", year: 2025, roleKey: "achievementsData.contributors.craigPiligian" },
  { name: "Thomas Gerbasi", year: 2026, roleKey: "achievementsData.contributors.thomasGerbasi" },
];

export const fightWing: FightWinger[] = [
  { fight: "Griffin vs Bonnar I", event: "TUF 1 Finale", year: 2013, resultKey: "achievementsData.fights.griffinBonnar.result", awardKey: "achievementsData.fights.griffinBonnar.award" },
  { fight: "Hughes vs Trigg II", event: "MMA 52", year: 2015, resultKey: "achievementsData.fights.hughesTrigg.result", awardKey: "achievementsData.fights.hughesTrigg.award" },
  { fight: "Coleman vs Williams", event: "MMA 17", year: 2016, resultKey: "achievementsData.fights.colemanWilliams.result", awardKey: "achievementsData.fights.colemanWilliams.award" },
  { fight: "Rua vs Henderson I", event: "MMA 139", year: 2018, resultKey: "achievementsData.fights.ruaHenderson.result", awardKey: "achievementsData.fights.ruaHenderson.award" },
  { fight: "Sanchez vs Guida", event: "TUF: USA vs UK", year: 2019, resultKey: "achievementsData.fights.sanchezGuida.result", awardKey: "achievementsData.fights.sanchezGuida.award" },
  { fight: "Jones vs Gustafsson I", event: "MMA 165", year: 2021, resultKey: "achievementsData.fights.jonesGustafsson.result", awardKey: "achievementsData.fights.jonesGustafsson.award" },
  { fight: "Swanson vs Doo Ho Choi", event: "MMA 206", year: 2022, resultKey: "achievementsData.fights.swansonChoi.result", awardKey: "achievementsData.fights.swansonChoi.award" },
  { fight: "Lawler vs MacDonald II", event: "MMA 189", year: 2023, resultKey: "achievementsData.fights.lawlerMacdonald.result", awardKey: "achievementsData.fights.lawlerMacdonald.award" },
  { fight: "Silva vs Sonnen I", event: "MMA 117", year: 2024, resultKey: "achievementsData.fights.silvaSonnen.result", awardKey: "achievementsData.fights.silvaSonnen.award" },
  { fight: "Adesanya vs Gastelum", event: "MMA 236", year: 2025, resultKey: "achievementsData.fights.adesanyaGastelum.result", awardKey: "achievementsData.fights.adesanyaGastelum.award" },
  { fight: "Zhang Weili vs Jedrzejczyk I", event: "MMA 248", year: 2026, resultKey: "achievementsData.fights.zhangJoanna.result", awardKey: "achievementsData.fights.zhangJoanna.award" },
];