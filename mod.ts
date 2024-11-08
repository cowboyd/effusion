export interface BoxAttrs {
  border?: boolean;
}

export function* Box(
  attrs: BoxAttrs,
  content: () => Operation<void>,
): Operation<void> {
}

export function* Text(value: string) {
}
