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
    this.fromRoute('demo.tabs.index'),
    this.toRoute('demo.tabs.nested-route'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}