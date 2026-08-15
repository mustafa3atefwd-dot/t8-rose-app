interface ICheckoutStepHeadingProps {
  title: string;
}

// Title for each checkout step
export function CheckoutStepHeading({ title }: ICheckoutStepHeadingProps) {
  return <legend className="text-ds-text-plain text-lg font-semibold lg:text-2xl xl:text-3xl">{title}</legend>;
}
