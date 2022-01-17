<template>
    <div v-if="!value">
        <label for="file-upload" class="custom-file-card custom-file-upload centered">
            <v-icon class="primary--text">mdi-camera-plus</v-icon>
        </label>
        <input id="file-upload" type="file" @change="handleFile" ref="fileInput" accept="image/*" />
    </div>
    <div v-else>
        <div class="custom-file-card custom-file-image centered">
            <div class="image-wrapper">
                <img
                    class="custom-file-img"
                    :src="value.image"
                    :alt="`Image-${value.file ? 'xxx' : ''}`"
                />
            </div>
            <v-btn color="grey" class="remove-btn" icon x-small absolute top right @click="remove">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            file: null,
            image: null
        }
    },
    methods: {
        handleFile(e) {
            const files = event.target.files
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.image = fileReader.result
                this.$emit("input", { file: this.file, image: this.image })
            })
            fileReader.readAsDataURL(files[0])
            console.log(files[0])
            this.file = files[0]
        },
        remove() {
            this.file = null;
            this.image = null
            this.$emit("input", null)
        }
    }
}
</script>

<style lang="scss">
.photo-input-card {
    border: var(--v-primary-base) 1px dashed;
    // background-color: rgba(253, 219, 216, 0.15);
}
input[type="file"] {
    display: none;
}

.custom-file-card {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    width: 140px;
    height: 100px;
    border-radius: 21px;
    margin: 7px;
    position: relative;
}
.custom-file-upload {
    border: var(--v-primary-base) 1px dashed;
    cursor: pointer;
}

.custom-file-upload {
    border: var(--v-primary-base) 1px dashed;
}

.image-wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 21px;
    border: 1px solid #ebe5e3;
    overflow: hidden;
}

.custom-file-img {
    object-fit: cover;
    width: 100%;
}
img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
}

.remove-btn {
}
</style>