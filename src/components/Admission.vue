<template>
    <main @mouseenter="customMouseEnter" @mousemove="positionMouse" @mouseleave="customMouseLeave">
        <div class="header_text" ref="headerText">Поступление</div>
        <div ref="customMouse" class="active_route" :style="{ left: left + 'px', top: top + 'px', height: height + 'px', width: width + 'px' }"></div>
    </main>
</template>

<script>
import { gsap } from 'gsap'

export default {
    name: 'Admission',
    data() {
        return {
            left: 0,
            top: 0,
            width: '10',
            height: '10',
        }
    },
    methods: {
        customMouseEnter: function() {
            gsap.to(this.$refs.customMouse, { duration: 1, opacity: 1 });
            gsap.to(this.$refs.headerText, { duration: 1, fontSize: '1rem' })
        },
        customMouseLeave: function() {
            gsap.to(this.$refs.customMouse, { duration: 1, opacity: 0 });
        },
        positionMouse: function(e) {
            gsap.to(this.$refs.customMouse, { duration: 1, delay: .01, left: e.pageX - 100, top: e.pageY - 50 })
        }
    }
}
</script>

<style lang="scss" scoped>

main {
    display: flex;
    justify-content: center;
    align-items: center;
    background: hotpink;
}


.header_text {
    font-size: 6rem;
    font-weight: 800;
}

.active_route {
    top: 0;
    left: 0;
    position: absolute;
    background: transparent;
    border: 10px solid orangered;
    backface-visibility: hidden;
    pointer-events: none;
    z-index: 5;
    opacity: 0;
}

</style>