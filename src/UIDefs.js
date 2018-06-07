export default {

    defaultContainerData: {
        flex: 1
    },

    tabs: {
        general: { title: 'General', visible: false },
        layout: { title: 'Layout', visible: false },
        content: { title: 'Content', visible: false }
    },

    defaultProperties: [
        {
            name: 'ID',
            title: 'ID',
            section: 'general',
            component: 'form-control-text'
        },
        {
            name: 'className',
            title: 'Class Name',
            section: 'general',
            component: 'form-control-text'
        },
        {
            name: 'row',
            title: 'Orientation',
            section: 'layout',
            values: ['Horizontal', 'Vertical'],
            component: 'form-control-switch'
        },
        {
            name: 'flex',
            title: 'Flex Weight',
            placeholder: 'Flex weight 0 to 12',
            section: 'layout',
            min: 0,
            max: 12,
            component: 'form-control-number'
        },
        {
            name: 'box',
            title: 'Box Sizing',
            placeholder: 'Flex weight 0 to 12',
            section: 'layout',
            component: 'form-control-box'
        }
    ]
};
