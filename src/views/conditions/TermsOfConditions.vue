<template>
  <quill-editor v-model="content"></quill-editor>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      content: `...`
    };
  },
  components: {
    quillEditor
  }
};
</script>
