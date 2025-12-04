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
        <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
        </head>
        <body>
          {children}
        </body>
      </html>
    )
}
