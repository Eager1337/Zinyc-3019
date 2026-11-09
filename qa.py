import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
  async with async_playwright() as p:
    browser = await p.chromium.launch(headless=True, executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    page = await browser.new_page(viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    await page.goto('http://localhost:4200',wait_until='networkidle')
    await page.evaluate('document.fonts.ready')
    assert await page.title()=="Zincy's Hair Beauty & Spa | Freetown"
    assert await page.evaluate('async () => { const imgs=Array.from(document.images); imgs.forEach(i=>i.loading="eager"); await Promise.all(imgs.map(i=>i.decode())); return imgs.every(i=>i.naturalWidth>0); }')
    await page.locator('#services').scroll_into_view_if_needed()
    await page.wait_for_timeout(900)
    await page.screenshot(path='/home/user/zincys-services.png')
    await page.get_by_role('button',name='Explore Hair & styling',exact=True).click()
    await page.get_by_role('button',name='Enquire about this service',exact=True).click()
    assert await page.locator('dialog select').first.input_value()=='Hair & styling'
    await page.keyboard.press('Escape')
    await page.locator('#gallery').scroll_into_view_if_needed()
    await page.get_by_role('button',name='Nails',exact=True).click()
    assert await page.locator('.gallery-image').count()==2
    await page.locator('.gallery-image').first.click()
    await page.get_by_role('button',name='Next image',exact=True).click()
    assert await page.locator('.lightbox-caption h3').inner_text()=='A fresh finish, from head to toe.'
    await page.keyboard.press('Escape')
    await page.get_by_role('button',name='All',exact=True).click()
    await page.get_by_role('button',name='Book your moment',exact=True).click()
    await page.get_by_label('Your name',exact=True).fill('Website QA Demo')
    await page.get_by_label('Phone number',exact=True).fill('+232 00000000')
    await page.get_by_label('Preferred date',exact=True).fill('2026-11-12')
    await page.locator('input[type=checkbox]').check()
    await page.get_by_role('button',name='Save & continue',exact=True).click()
    await page.get_by_text('One more step').wait_for(timeout=20000)
    wa=await page.get_by_role('link',name='Continue on WhatsApp').get_attribute('href')
    assert wa.startswith('https://wa.me/23279700150?text=') and 'Website%20QA%20Demo' in wa
    reference=await page.locator('.success .eyebrow').inner_text()
    await page.screenshot(path='/home/user/zincys-booking-success.png')
    await page.keyboard.press('Escape')
    await page.get_by_role('button',name='Privacy & booking information').click()
    assert await page.locator('.privacy-copy').is_visible()
    await page.get_by_role('button',name='Understood',exact=True).click()
    await page.set_viewport_size({'width':390,'height':844})
    await page.goto('http://localhost:4200',wait_until='networkidle')
    await page.screenshot(path='/home/user/zincys-mobile.png')
    assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    await page.get_by_role('button',name='Open menu',exact=True).click()
    await page.get_by_role('link',name='Our services',exact=True).click()
    assert not await page.locator('.nav').is_visible()
    await page.wait_for_timeout(900)
    await page.screenshot(path='/home/user/zincys-mobile-services.png')
    await page.get_by_role('button',name='Book your moment',exact=True).click()
    assert await page.locator('dialog').is_visible()
    await page.screenshot(path='/home/user/zincys-mobile-form.png')
    await page.keyboard.press('Escape')
    for width in [320,768,1024,1440]:
      await page.set_viewport_size({'width':width,'height':900})
      assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'),f'overflow at {width}'
    assert not errors, errors
    Path('/home/user/zincys/qa-results.json').write_text(json.dumps({'passed':True,'reference':reference,'screens':['desktop services','booking success','mobile hero','mobile services','mobile form'],'checks':['images loaded','gallery filtering','lightbox navigation','service preselection','request API and WhatsApp handoff','privacy modal','mobile menu','no overflow 320/390/768/1024/1440','no JS errors']},indent=2))
    print('ALL CHECKS PASSED',reference)
    await browser.close()

asyncio.run(main())