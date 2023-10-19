export default function addColors(Base) {
  return class extends Base {
    get colorClasses() {
      const { warn, accent, primary } = this.args;
      const colorClasses = [];

      if (warn) colorClasses.push('md-warn');
      if (accent) colorClasses.push('md-accent');
      if (primary) colorClasses.push('md-primary');

      return colorClasses;
    }
  };
}
