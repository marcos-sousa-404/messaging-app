const computeBorderRadius = (hasMessagesBefore: boolean, isSent: boolean) => {
  const radius = {
    borderTopLeftRadius: 'xl',
    borderTopRightRadius: 'xl',
    borderBottomLeftRadius: 'xl',
    borderBottomRightRadius: 'xl',
  };

  if (isSent) {
    if (hasMessagesBefore) {
      radius.borderTopRightRadius = 'xl';
    } else {
      radius.borderTopRightRadius = 'sm';
    }
  } else {
    if (hasMessagesBefore) {
      radius.borderTopLeftRadius = 'xl';
    } else {
      radius.borderTopLeftRadius = 'sm';
    }
  }

  return radius;
};

export default computeBorderRadius;
