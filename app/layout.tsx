export const metadata={
  title:"Todo App",
  description:"Simple Todo application to add tasks"
}
export default function HtmlLayout({
  children,
}: Readonly<{
    children:React.ReactNode;
  }>) {
    return(
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    )
}
