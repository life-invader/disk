export interface ButtonProps {
  onClick?: () => void,
  attrs?: React.ButtonHTMLAttributes<HTMLButtonElement>,
  children: React.ReactNode,
}