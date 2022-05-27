// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  // 讓圖片能夠點擊

  /*
  methods:{
    uploadHeadImg: function (){
      this.$el.querySelector('.hiddenInput').click()
    },
    handleGile: function (e){
      let $target = e.target || e.srcElement
      let file = $target.file[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.avatar = res.result
      }
      reader.readAsDataURL(file)
    },
  }
  */