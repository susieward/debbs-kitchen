<template>
<div id="menu">

    
    
    </div>


</template>
<script>
export default {
data(){
    return {
    
        
    }
},
name: 'menu',
    
computed: {
      id(){
            return this.$store.getters.getMenuByDate;
        },
        
        menu(){
          return this.$store.state.menu.id;  
        }
        
}
    
    
}


</script>