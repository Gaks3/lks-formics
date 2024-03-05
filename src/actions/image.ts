import { chromium } from 'playwright'

export const ss = async (url: string, id: number) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(url)

  await page.setViewportSize({ width: 1280, height: 720 })
  await page.evaluate(() => {
    document.body.style.transform = 'scale(1.2)'
  })

  await page.screenshot({
    path: `public/${id}.png`,
  })

  await browser.close()
}
