interface ICheckoutStepHeadingProps {
  title: string;
}

// Title for each checkout step
export default function CheckoutStepHeading({ title }: ICheckoutStepHeadingProps) {
  return <legend className="text-ds-text-plain text-2xl font-semibold xl:text-3xl">{title}</legend>;
}
