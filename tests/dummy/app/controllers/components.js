import Controller from '@ember/controller';

export default class extends Controller {
  get links() {
    return [
      {
        text: 'Autocomplete',
        route: 'components.autocomplete',
        icon: 'done'
      },
      {
        text: 'Button',
        route: 'components.button',
        icon: 'smart_button'
      },
      {
        text: 'Card',
        route: 'components.card',
        icon: 'view_carousel'
      },
      {
        text: 'Chips',
        route: 'components.chips',
        icon: 'label'
      },
      {
        text: 'Dialog',
        route: 'components.dialog',
        icon: 'call'
      },
      {
        text: 'Divider',
        route: 'components.divider',
        icon: 'linear_scale'
      },
      {
        text: 'Forms',
        route: 'components.forms',
        icon: 'edit'
      },
      {
        text: 'Grid List',
        route: 'components.grid-list',
        icon: 'view_compact'
      },
      {
        text: 'Icon',
        route: 'components.icon',
        icon: 'category'
      },
      {
        text: 'Input',
        route: 'components.input',
        icon: 'keyboard'
      },
      {
        text: 'List',
        route: 'components.list',
        icon: 'reorder'
      },
      {
        text: 'Menu',
        route: 'components.menu',
        icon: 'menu'
      },
      {
        text: 'Loading',
        route: 'components.loading',
        icon: 'hourglass_top'
      },
      {
        text: 'Toggles',
        route: 'components.toggles',
        icon: 'toggle_on'
      },
      {
        text: 'Select',
        route: 'components.select',
        icon: 'select_all'
      },
      {
        text: 'Sidenav',
        route: 'components.sidenav',
        icon: 'menu_open'
      },
      {
        text: 'Slider',
        route: 'components.slider',
        icon: 'linear_scale'
      },
      {
        text: 'Sidenav',
        route: 'components.sidenav',
        icon: 'menu_open'
      },
      {
        text: 'Speed Dial',
        route: 'components.speed-dial',
        icon: 'dialpad'
      },
      {
        text: 'Tabs',
        route: 'components.tabs.index',
        icon: 'table_chart'
      },
      {
        text: 'Toast',
        route: 'components.toast',
        icon: 'notifications_active'
      },
      {
        text: 'Toolbar',
        route: 'components.toolbar',
        icon: 'call_to_action'
      },
      {
        text: 'Tooltip',
        route: 'components.tooltip',
        icon: 'speaker_notes'
      },
    ]
  }
}
