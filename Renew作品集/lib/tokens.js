module.exports = Object.freeze({
  colors: {
    paper: '#F4F0E8',
    ink: '#151515',
    signal: '#FF5A36',
    acid: '#C8F45A',
    warning: '#F3B544',
    muted: '#8B877E',
    surface: '#FFFDF8',
    line: 'rgba(21,21,21,.14)',
    lineStrong: 'rgba(21,21,21,.28)'
  },
  font: {
    display: '"Noto Serif SC","Songti SC","STSong",serif',
    body: '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif',
    mono: '"SFMono-Regular","Cascadia Code","Roboto Mono",monospace'
  },
  screens: { width: 390, height: 844, scale: 2 },
  diagrams: { width: 1240, height: 760, scale: 1 },
  radius: { card: 18, control: 12, pill: 999 },
  motion: {
    orbit: '420ms',
    scan: '900ms',
    pulse: '2400ms',
    easing: 'cubic-bezier(.22,.61,.36,1)'
  }
});
