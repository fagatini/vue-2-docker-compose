<template>
  <div class="count-down">
    <svg class="count-down__progress-ring" width="120" height="120">
      <circle :class="['count-down__progress-ring__circle', circumferenceColor]" :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset" stroke="currentColor" stroke-width="4" fill="transparent" :r="radius"
        cx="60" cy="60" />
    </svg>
    <div class="count-down__timer">{{ currentCountValue }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TIME_TO_TURN_S } from '@/engine/constants';

export default {
  name: 'GameCountDown',
  props: {
    radius: {
      type: Number,
      default: 32,
    },
  },
  emits: [
    "elapsed",
  ],
  data() {
    return {
      intervalId: null,
      circumference: 2 * Math.PI * this.radius,
    };
  },
  computed: {
    strokeDashoffset() {
      const progress = this.currentCountValue / TIME_TO_TURN_S;
      return this.circumference * (1 - progress);
    },
    circumferenceColor() {
      const progress = this.currentCountValue / TIME_TO_TURN_S;

      if (progress > 0.67) {
        return "count-down__progress-ring__circle--high";
      } else if (progress > 0.33) {
        return "count-down__progress-ring__circle--medium";
      } else {
        return "count-down__progress-ring__circle--low";
      }
    },
    currentCountValue() {
      return this.getGameEngine.getRemainTurnSeconds();
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
};
</script>

<style scoped lang="less">
.count-down {
  position: relative;
  display: flex;

  width: 120px;
  height: 4vh;

  justify-content: center;
  align-items: center;
  z-index: 666;

  &__progress-ring {
    position: absolute;
    transform: rotate(-90deg);

    &__circle {
      &--high {
        color: #47be46;
      }

      &--medium {
        color: #bdbe46;
      }

      &--low {
        color: #be4646;
      }

      transition: stroke-dashoffset 0.5s linear;
    }
  }

  &__timer {
    position: absolute;

    font-size: 32px;
    font-weight: bold;

    color: #333;
  }
}
</style>
