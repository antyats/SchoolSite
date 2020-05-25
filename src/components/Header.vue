<template>
    <header class="header" @mouseenter="customMouseEnter" @mouseleave="customMouseLeave" ref="headerRect">
        <nav class="header_nav" @mouseleave="leaveRoute">
            <div class="header_nav-route" @mouseenter="hoverRoute">
                <h1 class="header_nav-route--text">Информация</h1>
            </div>
            <div class="header_nav-route" @mouseenter="hoverRoute">
                <h1 class="header_nav-route--text">Галерея</h1>
            </div>
            <div class="header_nav-route" @mouseenter="hoverRoute">
                <h1 class="header_nav-route--text">Образование</h1>
            </div>
            <div class="header_nav-route" @mouseenter="hoverRoute">
                <h1 class="header_nav-route--text">Поступление</h1>
            </div>
            <div class="header_nav-route" @mouseenter="hoverRoute">
                <h1 class="header_nav-route--text">Расписание</h1>
            </div>
            <div ref="customMouse" class="active_route" :style="{ left: left + 'px', top: top + 'px', height: height + 'px', width: width + 'px' }"></div>
        </nav>
    </header>
</template>

<script>
import { TweenMax } from 'gsap'

export default {
    name: 'Header',
    data() {
        return {
            left: 0,
            top: 0,
            width: '50',
            height: '50',
            borderRadius: '100'
        }
    },
    methods: {
        customMouseEnter: function() {
            TweenMax
            .to(this.$refs.customMouse, { duration: .3, opacity: 1 });
            this.$refs.headerRect.addEventListener('mousemove', this.positionMouse);
        },
        customMouseLeave: function() {
            TweenMax
            .to(this.$refs.customMouse, { duration: .3, opacity: 0 });
        },
        positionMouse: function(e) {
            TweenMax
            .to(this.$refs.customMouse, { duration: .1, left: e.pageX - 100, top: e.pageY - 50 })
        },
        hoverRoute: function(e) {

            this.$refs.headerRect.removeEventListener('mousemove', this.positionMouse);

            let left, top, width, height;

            left = e.target.getBoundingClientRect().left;
            top = e.target.getBoundingClientRect().top;
            width = e.target.getBoundingClientRect().width;
            height = e.target.getBoundingClientRect().height;

            TweenMax.to(this.$refs.customMouse, { duration: .5, width, left, top, height, borderRadius: 0, backgroundColor: 'white' });
        },
        leaveRoute: function() {
            this.$refs.headerRect.addEventListener('mousemove', this.positionMouse);
            TweenMax.to(this.$refs.customMouse, { duration: .5, width: 50, height: 50, borderRadius: '100%', backgroundColor: 'transparent' });
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
    .header {
        position: fixed;
        width: 23rem;
        height: 100vh;
        background-color: #3949AB;
        color: #ffffff;
        cursor: none;

        &_nav {
            margin-top: 3rem;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            &-route {
                width: 80%;
                font-family: 'Ubuntu', sans-serif;
                font-size: 1.6rem;

                &:hover > h1 {
                    color: #3949AB;
                }

                & > h1 {
                    z-index: -13;
                    transition: .5s;
                    pointer-events: none;
                }
            }
        }
    }
    .active_route {
        top: 0;
        left: 0;
        position: absolute;
        background: transparent;
        border: 2px solid white;
        backface-visibility: hidden;
        border-radius: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0;
    }
</style>