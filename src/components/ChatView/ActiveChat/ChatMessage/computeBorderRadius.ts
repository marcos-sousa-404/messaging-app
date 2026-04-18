const computeBorderRadius = (hasMessagesBefore: boolean, isSent: boolean): BorderRadiusConfig => {
  const radius: BorderRadiusConfig = {
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

export interface BorderRadiusConfig {
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;
}
