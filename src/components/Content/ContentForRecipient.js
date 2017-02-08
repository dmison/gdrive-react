const contentForRecipient = (content, recipient) => {

  return content.map((content)=>{
    let output = '';
    switch(content.type){
    case 'common':
      output = content.editorContent;
      break;
    case 'per_recipient':
      var recipient_content = content.editorContent.find((ec)=>{
        return ec.recipient === recipient;
      });
      output = recipient_content? recipient_content.editorContent : '';
      break;
    case 'group':
      output = content.recipients.indexOf(recipient)===-1?'':content.editorContent;
      break;
    default: '';
    }
    return output===''?'':output;
  });

};

export default contentForRecipient;
