import QuestionFormBase from './form-base';

class Essay extends QuestionFormBase {
  constructor($form) {
    super($form);

    this.initTitleEditor(this.validator);
    this.initAnalysisEditor();

    this.answerFieldId = 'question-answer-field';
    this.$answerField = $('#'+this.answerFieldId);

    this.init();
  }

  init() {
    this.$answerField.rules('add',{
      required:true
    })

    let editor = CKEDITOR.replace(this.answerFieldId, {
      toolbar: 'Minimal',
      filebrowserImageUploadUrl: this.$answerField.data('imageUploadUrl'),
      height: this.$answerField.height()
    });

    editor.on( 'change', () => {    
      this.$answerField.val(editor.getData());
    });
    // editor.on('blur', function() {
    //   validator.form();
    // });
  }
}

export default Essay;