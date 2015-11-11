import Ember from 'ember';

const layoutProperties = [
    'layout',
    'layout-align',
    'flex-order',
    'flex',
    'offset',
    'hide',
    'show'

];

const layoutSingleRules = [
    'layout-type:layout',
    'layout-padding',
    'layout-margin',
    'layout-wrap',
    'layout-fill'
];

const sizeNames = [
    'sm',
    'gt-sm',
    'md',
    'gt-md',
    'lg',
    'gt-lg'

];

var finalRules = [];

Ember.EnumerableUtils.forEach(layoutProperties, (layoutProperty) => {
    Ember.EnumerableUtils.forEach(sizeNames, (sizeName) => {
        finalRules.push(layoutProperty + '-' + sizeName);
    });

    finalRules.push('hide');
    finalRules.push('show');
});

finalRules.push.apply(finalRules, layoutSingleRules);

var LayoutRulesMixin = Ember.Mixin.create({
    attributeBindings: finalRules

});

export default LayoutRulesMixin;
