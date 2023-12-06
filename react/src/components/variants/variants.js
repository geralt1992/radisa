
const containerVariant = {
  hidden: {
      y: 350,
      opacity: 0,
  }, 
  show: {
      y: 0,
      opacity: 1,
      transition: {
          type: "spring", 
          delay: .8 , 
          damping: 20,
          stiffness: 100,
      },
  }
}

const titleAndContainerVariant = {
  hidden: {
      y: 350,
      opacity: 0,
  },
  show: {
      y: 0,
      opacity: 1,
      transition: {
          type: "spring", 
          delay: .8 , 
          damping: 20,
          stiffness: 100,
      },
  }
}

const glueVariant = {
  hidden: {
      opacity: 0,
  }, 

  show: {
      opacity: 1,
      transition: {
          type: "tween", 
          delay: 1.8 , 
      },

  }
}

const navContainer = {
  hidden: { 
      opacity: 0
  },
  show: {
  opacity: 1,
  transition: {
      staggerChildren: .4,
      delay: .1,
      duration: .1
  }
  }
}

const navItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const hoverNavVariant = {
  hidden: {
      y:0,
  },
  show: {
      y:-5,
      fontWeight: 900,
      transition:{ type: "spring", stiffness: 1900 },
      duration: 0.3,
  }
}

const logoVariantHover = {
  hidden: {
      scale: 1,
  },
  show: {
      scale: 1.2,
      transition:{ type: "spring",     
      damping: 5,
      stiffness: 500,
      }
  
  },
}

export { containerVariant, titleAndContainerVariant, glueVariant, navContainer, navItem, hoverNavVariant, logoVariantHover }