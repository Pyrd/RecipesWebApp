<template>
  <div class="po-password-strength-bar" :class="passwordClass"></div>
</template>

<script>
export default {
  name: 'password-meter',
  props: {
    password: String
  },
  computed: {
    passwordClass() {
      if (!this.password) {
        return null
      }
      const strength = this.checkStrength(this.password)
      const score = this.scorePassword(this.password)
      this.$emit('score', { score, strength })
      return {
        [strength]: true,
        scored: true
      }
    }
  },
  methods: {
    checkStrength(pass) {
      const score = this.scorePassword(pass)
      return this.nameScore(score)
    },
    nameScore(score) {
      switch (score) {
        case 0:
          return 'risky'
        case 1:
          return 'guessable'
        case 2:
          return 'weak'
        case 3:
          return 'safe'
        case 4:
          return 'secure'
        default:
          return null
      }
    },
    scorePassword(pass) {
      let score = 0
      let length = 0
      let specialChar = 0
      let caseMix = 0
      let numCharMix = 0

      const specialCharRegex = /[^A-Za-z0-9]/g
      const lowercaseRegex = /(.*[a-z].*)/g
      const uppercaseRegex = /(.*[A-Z].*)/g
      const numberRegex = /(.*[0-9].*)/g
      const repeatCharRegex = /(\w)(\1+\1+\1+\1+)/g

      const hasSpecialChar = specialCharRegex.test(pass)
      const hasLowerCase = lowercaseRegex.test(pass)
      const hasUpperCase = uppercaseRegex.test(pass)
      const hasNumber = numberRegex.test(pass)
      const hasRepeatChars = repeatCharRegex.test(pass)

      if (pass.length > 4) {
        if ((hasLowerCase || hasUpperCase) && hasNumber) {
          numCharMix = 1
        }

        if (hasUpperCase && hasLowerCase) {
          caseMix = 1
        }

        if ((hasLowerCase || hasUpperCase || hasNumber) && hasSpecialChar) {
          specialChar = 1
        }

        if (pass.length > 8) {
          length = 1
        }

        if (pass.length > 12 && !hasRepeatChars) {
          length = 2
        }

        if (pass.length > 25 && !hasRepeatChars) {
          length = 3
        }

        score = length + specialChar + caseMix + numCharMix

        if (score > 4) {
          score = 4
        }
      }

      return score
    }
  }
}
</script>

<style>
.po-password-strength-bar {
  border-radius: 2px;
  transition: all 0.2s linear;
  height: 5px;
  margin-top: 8px;
}

.po-password-strength-bar.risky {
  background-color: #f95e68;
  width: 10%;
}

.po-password-strength-bar.guessable {
  background-color: #fb964d;
  width: 32.5%;
}

.po-password-strength-bar.weak {
  background-color: #fdd244;
  width: 55%;
}

.po-password-strength-bar.safe {
  background-color: #b0dc53;
  width: 77.5%;
}

.po-password-strength-bar.secure {
  background-color: #35cc62;
  width: 100%;
}
</style>
