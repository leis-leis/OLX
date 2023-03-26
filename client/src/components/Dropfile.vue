<script>
import { useFileStore } from '../stores/files';

export default {  
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
    onChange() {
      this.files = [...this.$refs.file.files];
      const store = useFileStore();
      store.addFiles(this.files)
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
    cropImage() {
      const result = this.$refs.cropper.getResult();
      const newTab = window.open();
      // for testing open the result in a new tab
      newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
        "image/jpeg"
      )}"></img>`;
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
  },
};
</script>

<template>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        single
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Upuść avatar :)</div>
        <div v-else>Upuść tu avatar, <u>lub kliknij</u> aby zaktualizować.</div>
      </label>
      <!-- Note: Only add the code block below -->
      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div>
            <img class="preview-img" :src="generateURL(file)" />
            <p>
              {{ file.name }} -
              {{ Math.round(file.size / 1000) + "kb" }}
            </p>
          </div>
          <div>
            <button
              class="ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Usuń plik"
            >
              <b>×</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 5%;
}

.dropzone-container {
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
