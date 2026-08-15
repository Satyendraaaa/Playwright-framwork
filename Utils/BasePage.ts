

import { Page, Locator, FrameLocator, Download, FileChooser } from "@playwright/test";


export class BasePage {

      page: Page;

      constructor(page: Page) {
            this.page = page;

      }

      ///=============================================================================
      ///                               CLICK ACTIONS;
      ///============================================================================

      

      /**
       * this method used to normal click on element
       * @param -locator 
       * @return -void(it is not return anythings)
       */
      async click(locator: Locator, force: boolean = false): Promise<void> {
            try {
                  await locator.waitFor({ state: 'visible', timeout: 120000 });
                  await locator.click();
            } catch (error) {
                  if (force) {
                        await locator.scrollIntoViewIfNeeded().catch(() => undefined);
                        await locator.click({ force: true });
                  } else {
                        throw error;
                  }
            }

      }


      /**
       * this method used to when application required a doubleClick on element
       *  action to perform
       * @param -locator 
       * @return -void (it is not return anythings)
       */
      async doubleClick(locator: Locator): Promise<void> {
            await locator.dblclick();

      }


      /**
       * this method used to I need to open folder or image or Rename right Click on element
       * @param -locator 
       * @return -void (it is not return anythings)
       */
      async rightClick(locator: Locator): Promise<void> {
            await locator.click({ button: 'right' });

      }


      /**
       * this method used to when normal click is not working then we force click on element
       * @param -locator 
       * @return void (it is not return anythings)
       */
      async forceClick(locator: Locator): Promise<void> {
            await locator.click({ force: true });

      }



      /**
       * this method used to when multiple element and click on specific enelment
       *  click by indexing on element;
       * @param -locator 
       * @param -give the value in index number
       * @return -void (it is not return anythings)
       */
      async clickByIndex(locator: Locator, index: number): Promise<void> {
            await locator.nth(index).click();

      }


      ///====================================================================================
      ///                               TEXTBOX ACTIONS
      ///====================================================================================


      /** this method is used to fill value into Input Box ;
       * @param -locator 
       * @param -give the value in String ;
       */
      async fill(locator: Locator, value: string): Promise<void> {
            await locator.waitFor({ state: 'visible', timeout: 120000 });
            await locator.fill(value);

      }


      /** thid method is used to type character by character as a user into input Box;
       *  thid method also type and append value in input box;
       * @param -locator 
       * @param - give the value in string; 
       */
      async type(locator: Locator, value: string): Promise<void> {
            await locator.type(value);
      }


      /** this method is used to clear the value from input box;
       * @param- locator 
       */
      async clear(locator: Locator): Promise<void> {
            await locator.clear();
      }


      /** thid method is used to add or addends a new value after the existing input value;
       * @param -locator 
       * @param -gives the value in string; 
       */
      async appendText(locator: Locator, value: string): Promise<void> {
            await locator.type(value);
      }


      ///======================================================================================
      ///                                    KEYBOARD ACTIONS;
      ///=======================================================================================


      /** this method is used to press a key on the keyboard;
       * @param -locator 
       * @param -gives keboard key in string; 
       */
      async press(locator: Locator, key: string): Promise<void> {
            await locator.press(key);

      }


      /** this method is used to press the Enter key;
       * @param -locator 
       */
      async pressEnter(locator: Locator): Promise<void> {
            await locator.press('Enter');

      }

      /** this method is used to pres Tab Key on the keboard and 
       * The cursor show into next field 
       * @param- locator 
       */
      async pressTab(locator: Locator): Promise<void> {
            await locator.press('Tab');

      }


      ///===================================================================================
      ///                                       ELEMENT INFO
      ///===================================================================================


      /** this method used to get visible innertext of the web Element;
       * @param- locator 
       * @returns- it is return the the visible text in string of user;  
       */
      async getVisibleInnerText(locator: Locator): Promise<string> {
            await locator.waitFor({ state: 'visible', timeout: 120000 });
            return await locator.innerText();

      }


      /** this method is used to get hidden and visible text of web element;
       * @param- locator 
       * @returns-it is return the all text in string of user , whether it is visible or hidden;  
       */
      async getInnerText(locator: Locator): Promise<string | null> {
            return await locator.textContent();

      }


      /** this method is used to get the visible text form all matching elements;
       * @param -locator 
       * @returns- it returns an array of strings, where each item represents the
       * visible text of one element; 
       */
      async getAllInnerTexts(locator: Locator): Promise<string[]> {
            return await locator.allInnerTexts();

      }


      /**this method is used to get the all(hidden and visible) text from all matching web elements;
       * @param -locator 
       * @returns - it returns an array of strings, we use it when we need to verify
       * multiple value;
       */

      async getAllTextContents(locator: Locator): Promise<string[]> {
            return await locator.allTextContents();
      }


      /**this method ccused to get attribute value of web element;
       * @param -locator 
       * @param -we gives the attribute name in string;
       * @returns - it is return value of attribute;
       * if the attribute is available, it returns its value as a string;
       * if the attribute is not a available, it returns null.
       */

      async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
            return await locator.getAttribute(attribute);

      }


      /**this method is used to get the current value of an input field,
       * textarea, or dropdown.
       * @param- locator 
       * @returns-if the input field is has a value, it returns that value
       * as a string;
       * if the input field is empty, it returns an empty string (""); 
       */

      async getInputValue(locator: Locator): Promise<string> {
            return await locator.inputValue();

      }


      /** this method is used to get the total number of matching elements
       * on a webpage;
       * @param- locator 
       * @returns- it returns the total number of matching element as a number; 
       */

      async getElementCount(locator: Locator): Promise<number> {
            return await locator.count();

      }


      ///================================================================================
      ///                                     DROPDOWN;
      ///=================================================================================


      /**this method is used to select an option from the dropdown by label;
       * @param -locator 
       * @param -gives the label in string;
       */

      async selectOptionByLabel(locator: Locator, label: string): Promise<void> {
            await locator.waitFor({ state: 'visible', timeout: 120000 });
            await locator.selectOption({ label });

      }


      /** this method is used to select an option from the dropdown by Attribute value;
       * @param- locator 
       * @param -gives value in string; 
       */

      async selectOptionByValue(locator: Locator, value: string): Promise<void> {
            await locator.selectOption({ value });

      }


      /** this method is used to select an iption from the dropdown by index number;
       * @param -locator 
       * @param -gives index number in string; 
       */

      async selectByIndex(locator: Locator, index: number): Promise<void> {
            await locator.selectOption({ index });

      }


      /**
       * 
       * @param locator 
       * @returns 
       */

      async getSelectedOptions(locator: Locator): Promise<string[]> {
            return await locator.evaluate(
                  (dropdown: HTMLSelectElement) =>
                        Array.from(dropdown.selectedOptions).map(option => option.text)
            );

      }


      /**
       * 
       * @param locator 
       * @returns 
       */

      async getDropdownOptions(locator: Locator): Promise<string[]> {
            return await locator.evaluate(
                  (dropdown: HTMLSelectElement) =>
                        Array.from(dropdown.options).map(option => option.text)
            );

      }


      ///================================================================================
      ///                                      CHECKBOX & RADIO
      ///===================================================================================


      /** this method is used to check the checkBox;
       * @param -locator 
       * @returns- this method does not return any value; 
       */
      async check(locator: Locator): Promise<void> {
            await locator.check();

      }


      /** this method is used to unCheck an already selected checkbox;
       * @param- locator 
       * @returns- this method does not return any value; 
       */
      async uncheck(locator: Locator): Promise<void> {
            await locator.uncheck();

      }


      /** this method is used to check the Radio button;
       * @param- locator 
       * @returns- this method does not return any value;
       */
      async selectRadioButton(locator: Locator): Promise<void> {
            await locator.check();

      }


      ///===============================================================================================
      ///                                         MOUSE ACTIONS;
      ///=============================================================================================


      /** this method is used to move the mouse pointer over an element;
      * @param- locator 
      * @returns- this method does not return any value;
       */
      async hover(locator: Locator): Promise<void> {
            await locator.hover();

      }


      /** this method used to drag one element and drop it onto another element;
       * it takes the target element as a parameter;
       * In this method we pass the target element where we want to frop the source element;
       * @param source -it drags the source element and
       * @param target - drops it onto the target element;
       * @returns- this method does not return any value;
       */
      async dragAndDrop(source: Locator, target: Locator): Promise<void> {
            await source.dragTo(target);

      }



      ///=======================================================================================
      ///                                    MULTIPLE ELEMENTS;
      ///=======================================================================================


      /**
       * 
       * @param locator 
       */

      async clickAll(locator: Locator): Promise<void> {
            const count = await locator.count();
            for (let i = 0; i < count; i++) {
                  await locator.nth(i).click();
            }

      }


      /**
       * 
       * @param locator 
       * @param index 
       * @returns 
       */

      async getTextByIndex(locator: Locator, index: number): Promise<string> {
            return await locator.nth(index).innerText();

      }


      /**
       * 
       * @param locator 
       * @param index 
       * @param attribute 
       * @returns 
       */

      async getAttributeByIndex(locator: Locator, index: number, attribute: string): Promise<string | null> {
            return await locator.nth(index).getAttribute(attribute);

      }



      ///=====================================================================================
      ///                                      WINDOWS / TABS
      ///=====================================================================================


      /**
       * 
       * @returns 
       */

      async getAllPages() {
            return this.page.context().pages();

      }


      /**
       * 
       * @returns 
       */

      async getPageCount(): Promise<number> {
            return this.page.context().pages().length;

      }


      /**
       * 
       * @param index 
       * @returns 
       */

      async switchToTab(index: number): Promise<Page | undefined> {
            const pages: Page[] = this.page.context().pages();
            const page: Page | undefined = pages[index];
            if (page) await page.bringToFront();
            return page;

      }


      /**
       * 
       * @returns 
       */

      async getLatestTab() {
            const pages = this.page.context().pages();
            return pages[pages.length - 1];

      }


      /** this method is used to close a browser, broweser context, or page;
       * @param- It dose not require any parameter;
       * @returns- I does not return any value;
       */
      async closeCurrentTab(): Promise<void> {
            await this.page.close();

      }


      ///======================================================================================
      ///                                   ALERTS;
      ///======================================================================================


      /** this method is used to accept a browser dialog by ckicking the ok button;
       * @param- No parameter, It dose not require any parameter;
       * @returns- It does not return any value.
       */
      async acceptAlert(): Promise<void> {
            this.page.once('dialog', async dialog => {
                  await dialog.accept();

            });

      }


      /** this method is used to enter text into a prompt dialog and click the ok button;
       * @param text- we pass a string value (text) as a parameter;
       * @returns- It does not return any value; 
       */

      async acceptPrompt(text: string): Promise<void> {
            this.page.once('dialog', async dialog => {
                  await dialog.accept(text);

            });
      }



      ///======================================================================================
      ///                                      SCROLLING
      ///======================================================================================


      /**
       * 
       * @param locator 
       */

      async scrollToElement(locator: Locator): Promise<void> {
            await locator.scrollIntoViewIfNeeded();

      }


      /**
       * 
       */

      async scrollByXCordYCord(deltaX: number, deltaY: number) {
            await this.page.mouse.wheel(deltaX, deltaY);

      }


      async scrollUp(pixels: number = 500) {
            await this.page.mouse.wheel(0, -Math.abs(pixels));

      }


      async scrollDown(pixels: number = 500) {
            await this.page.mouse.wheel(0, Math.abs(pixels));

      }


      /**
       * 
       */

      async scrollToBottom(): Promise<void> {
            await this.page.evaluate(() =>
                  window.scrollTo(0, document.body.scrollHeight)
            );

      }


      /**
       * 
       * @param x 
       * @param y 
       */

      async scrollBy(x: number, y: number): Promise<void> {
            await this.page.evaluate(
                  ({ x, y }) => window.scrollBy(x, y),
                  { x, y }
            );

      }


      // =========================================================================================
      //                                BROWSER METHODS
      // =========================================================================================


      /**
       * 
       * @param url 
       */

      async hitUrl(url: string): Promise<void> {
            await this.page.goto(url);

      }


      /**
       * 
       */

      async refresh(): Promise<void> {
            await this.page.reload();

      }


      /**
       * 
       */

      async goBack(): Promise<void> {
            await this.page.goBack();

      }


      /**
       * 
       */

      async goForward(): Promise<void> {
            await this.page.goForward();

      }


      /**
       * 
       * @returns 
       */

      async getCurrentTitle(): Promise<string> {
            return await this.page.title();

      }


      /**
       * 
       * @returns 
       */

      async getCurrentUrl(): Promise<string> {
            return this.page.url();

      }


      /**
       * 
       */


      async close(): Promise<void> {
            await this.page.close();

      }


      ///=================================================================================
      ///                             FRAME LOCATOR
      ///=================================================================================


      /**
       * 
       * @param frameSelector 
       * @returns 
       */

      async switchToFrame(frameSelector: string): Promise<FrameLocator> {
            return this.page.frameLocator(frameSelector);

      }


      /**
       * 
       * @param parentFrame 
       * @param childFrame 
       * @returns 
       */

      async switchToNestedFrame(parentFrame: string, childFrame: string): Promise<FrameLocator> {
            return this.page.frameLocator(parentFrame).frameLocator(childFrame);

      }



      ////===========================================================================
      ////                          SCREENSHOOT
      ///============================================================================


      /**
       * 
       * @param path 
       */

      async takeScreenshot(path?: string, fullPage: boolean = true): Promise<Buffer> {
            const options: { path?: string; fullPage?: boolean } = { fullPage };
            if (path) options.path = path;
            return await this.page.screenshot(options) as Buffer;

      }

      // Backward-compatible alias for existing callers
      async takePageScreenShot(path: string): Promise<Buffer> {
            return await this.takeScreenshot(path, true);
      }



      ////=============================================================================
      ////                     UPLOAD & DOWNLOAD 
      ///==============================================================================


      async upload_SingleFile(locator: Locator, path: string) {
            await locator.setInputFiles(path);
      }


      async upload_MultipulFile(locator: Locator, filePath: string[]) {
            await locator.setInputFiles(filePath);
      }


      async removeUploadedfile(locator: Locator) {
            await locator.setInputFiles([]);
      }


      // async clickAndUpload
      // file(locator: Locator, filePath: string) {
      //       let fileChooserPromise: Promise<FileChooser> = this.page.waitForEvent("FileChooser");
      //       await locator.click();
      //       let fileChooser: FileChooser = await fileChooserPromise;
      //       await fileChooser.setfile(filePath)
      // };



      // async clickAndDownloadFile(locator: Locator, filePath: string) {
      //       let fileDownloadPromise: Promise<Download> = this.page.waitForEvent("download");
      //       await locator.click();
      //       let download: Download = await fileDownloadPromise;
      //       await download.setfile(filePath)
      // };




      ////=============================================================================
      ////                         WAIT
      ///==============================================================================




      async waitForTimeOut(duration:number):Promise<void>{
            await this.page.waitForTimeout(duration);
      }


      async waitForPageLoad(locator?:string):Promise<void>{
            await this.page.waitForLoadState();
      }


      // Additional common wrappers
      async waitForSelector(selector: string, options?: Parameters<Page["waitForSelector"]>[1]){
            if (options) return await this.page.waitForSelector(selector, options);
            return await this.page.waitForSelector(selector as any);
      }

      async waitForLocatorVisible(locator: Locator): Promise<void> {
            await locator.waitFor({ state: 'visible' });
      }

      async waitForLocatorHidden(locator: Locator): Promise<void> {
            await locator.waitFor({ state: 'hidden' });
      }

      async isVisible(locator: Locator): Promise<boolean> {
            return await locator.isVisible();
      }

      async isEnabled(locator: Locator): Promise<boolean> {
            return await locator.isEnabled();
      }

      async isChecked(locator: Locator): Promise<boolean> {
            return await locator.isChecked();
      }

      async screenshotElement(locator: Locator, path?: string): Promise<Buffer | null> {
            return await locator.screenshot(path ? { path } : undefined) as Buffer | null;
      }

      async waitForNavigation(options?: Parameters<Page["waitForNavigation"]>[0]){
            return await this.page.waitForNavigation(options);
      }

      async clickAndDownload(locator: Locator): Promise<Download> {
            const [download] = await Promise.all([
                  this.page.waitForEvent('download'),
                  locator.click()
            ]);
            return download;
      }

      async clickAndUpload(locator: Locator, filePath: string | string[]): Promise<void> {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await locator.click();
            const fileChooser = await fileChooserPromise as FileChooser;
            await fileChooser.setFiles(filePath);
      }





}


