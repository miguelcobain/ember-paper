export default function() {

  // nav bar demo
  this.transition(
    this.fromValue(undefined),
    this.use('toLeft')
  );

  this.transition(
    this.toValue((toValue, fromValue) => {
      return toValue && fromValue && toValue > fromValue;
    }),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  // nav bar demo - routable usage
  this.transition(
    this.fromRoute('demo.nav-bar.index'),
    this.toRoute('demo.nav-bar.nested-route'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}