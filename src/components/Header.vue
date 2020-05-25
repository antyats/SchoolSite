<template>
    <header class="header" @mouseenter="customMouseEnter" @mouseleave="customMouseLeave" ref="headerRect">
        <nav class="header_nav">
            <div v-for="link in links" :key="link.to" class="header_nav-route" @click="() => routerAnimation(link)" @mouseenter="hoverRoute" @mouseleave="leaveRoute" :class="{active: link.isActive, hide_active: link.isHide}">
                <h1 class="header_nav-route--text">{{ link.label }}</h1>
            </div>
            <div ref="customMouse" class="active_route" :style="{ left: left + 'px', top: top + 'px', height: height + 'px', width: width + 'px' }"></div>
        </nav>
    </header>
</template>

<script>
import { gsap } from 'gsap'
export default {
    name: 'Header',
    data() {
        return {
            links: [
                {
                    label: 'Информация', to: '/', isActive: false, isHide: false
                },
                {
                    label: 'Галерея', to: '/gallery', isActive: false, isHide: false
                },
                {
                    label: 'Образование', to: '/education', isActive: false, isHide: false
                },
                {
                    label: 'Поступление', to: '/admission', isActive: false, isHide: false
                },
                {
                    label: 'Расписание', to: '/timetable', isActive: false, isHide: false
                }               
            ],
            left: 0,
            top: 0,
            width: '50',
            height: '50',
            activeEl: null
        }
    },
    methods: {
        customMouseEnter: function() {
            gsap.to(this.$refs.customMouse, { duration: .3, opacity: 1 });
            gsap.to(this.$refs.headerRect.parentElement, { duration: 1, gridTemplateColumns: '27rem 1fr' })
            gsap.to(this.$refs.headerRect, { duration: 1, width: '100%' })
            this.$refs.headerRect.addEventListener('mousemove', this.positionMouse);
            let el;
            if (this.links[this.activeEl]) {
                el = this.links[this.activeEl];
                el.isHide = false;
            }
        },
        customMouseLeave: function() {
            let el;
            if (this.links[this.activeEl]) {
                el = this.links[this.activeEl];
                el.isHide = true;
            }
            
            gsap.to(this.$refs.headerRect.parentElement, { duration: 1, gridTemplateColumns: '23rem 1fr' })
            gsap.to(this.$refs.customMouse, { duration: .3, opacity: 0 });
            gsap.to(this.$refs.headerRect, { duration: 1, width: '23rem' })
        },
        positionMouse: function(e) {
            gsap.to(this.$refs.customMouse, { duration: .1, left: e.pageX - 100, top: e.pageY - 50 })
        },
        hoverRoute: function(e) {
            this.$refs.headerRect.removeEventListener('mousemove', this.positionMouse);

            let left, top, width, height;
            left = e.target.getBoundingClientRect().left;
            top = e.target.getBoundingClientRect().top;
            width = e.target.getBoundingClientRect().width;
            height = e.target.getBoundingClientRect().height;

            gsap.to(this.$refs.customMouse, 
            { 
                duration: .5, 
                width, 
                left, 
                top, 
                height, 
                scale: 1, 
                borderTopLeftRadius: '5px', 
                borderBottomLeftRadius: '5px', 
                backgroundColor: 'white' 
            });
        },
        leaveRoute: function() {
            this.$refs.headerRect.addEventListener('mousemove', this.positionMouse);
            gsap.to(this.$refs.customMouse, 
            { 
                duration: .5, 
                width: 50, 
                height: 50, 
                borderRadius: '100%', 
                backgroundColor: 'transparent' 
            });
        },
        routerAnimation: function(path) {
            this.links.forEach(link => link.isActive = false);

            let ind = this.links.indexOf(path);

            this.activeEl = ind;

            this.links[ind].isActive = true;

            if (!(path.to == this.$route.path)) {
                this.$router.push(path.to);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
    .header {
        width: 100%;
        height: 100%;
        background-color: orangered;
        color: #ffffff;
        cursor: none;

        &_nav {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            
            &-route {
                width: 100%;
                font-family: 'Ubuntu', sans-serif;
                font-size: 2rem;
                text-align: right;
                padding-right: 2rem;
                
                &:hover {
                    z-index: 10;
                }

                &:hover > h1 {
                    color: #212121;
                }
                & > h1 {
                    text-decoration: underline;
                    text-decoration-color: rgb(0, 0, 238);
                    color: #ffffff;
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
        z-index: 5;
        opacity: 0;
    }
    .active {
        background: white;
        border: 20px solid orangered;
        transform: scale(1.3, 1.3);
        transition: .3s;
        z-index: 70;

        & > h1 {
            color: #212121;
        }
    }
    .hide_active {
        background: white;
        border: 0px solid orangered;
        transform: scale(1, 1);
        transition: .5s;
        z-index: 70;

        & > h1 {
            color: #212121;
        }
    }
</style>