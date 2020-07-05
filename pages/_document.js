import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

import {ServerStyleSheet}  from 'styled-components'

function withLog(Comp) {
  return (props) =>{
    // console.log(props)
    return <Comp {...props}></Comp>
  }
}

class MyDocument extends Document {
  
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try{
      ctx.renderPage = () =>{
        return originalRenderPage({
          enhanceApp: (App) => (props)=>sheet.collectStyles(<App {...props} />)
        })
      }
      
      const initialProps = await Document.getInitialProps(ctx)
      return { 
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally{
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`.test {color: red}`}</style>
        </Head>
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
