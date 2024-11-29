import { defineComponent } from 'vue'

export const RenderVNode = defineComponent({
  props: {
    node: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    return () => props.node
  },
})
