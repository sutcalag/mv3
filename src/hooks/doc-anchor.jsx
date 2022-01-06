import { useEffect } from 'react';

/**
 * This is for generate anchors in faq page.
 * Version >= 1.0.0 and html tag is h4.
 * Will generate h4 anchors after the first h1 title.
 * @param {*} version
 * @param {*} editPath
 */
export const useGenAnchor = (version, editPath) => {
  useEffect(() => {
    const insertAnchors = anchors => {
      const firstElement = document.querySelector('h1');

      firstElement.insertAdjacentHTML('afterend', anchors);
    };

    const getAnchorsFromInfo = info => {
      const items = info
        .map(
          item =>
            `<li>
              <a href=${item.id}>
                ${item.title}
              </a>
            </li>`
        )
        .join('\n');
      const tpl = `
      <ul id="auto-anchors">
        ${items}
      </ul>
    `;
      return tpl;
    };

    const isAutoGenVersion = version && version.split('.')[0].slice(1) >= 1;

    if (editPath && editPath.includes('faq') && isAutoGenVersion) {
      const faqHeadersElements = document.querySelectorAll('h4');
      if (faqHeadersElements.length > 0) {
        const info = Array.from(faqHeadersElements).map(element => ({
          id: `#${element.id}`,
          title: element.innerHTML,
        }));

        const anchors = getAnchorsFromInfo(info);

        insertAnchors(anchors);
      }
    }
  }, [editPath, version]);
};

/**
 * This is for format all anchors href generated by gatsby autolink plugin
 * Will generate valid anchor src compatible with Chinese
 */
export const useFormatAnchor = () => {
  useEffect(() => {
    const anchors = document.querySelectorAll('a');
    Array.from(anchors)
      .filter(anchor => Array.from(anchor.classList).includes('icon-wrapper'))
      .forEach(a => {
        const link = a.href;
        const anchorIndex = link.indexOf('#');
        const anchorLink = anchorIndex !== -1 ? link.slice(anchorIndex) : '';
        const validAnchorLink = decodeURI(anchorLink)
          .replace(/[.｜,｜/｜'｜?｜？｜、|，|(|)|:]/g, '')
          .split(' ')
          .join('-');
        a.href =
          anchorLink !== ''
            ? `${link.slice(0, anchorIndex)}${validAnchorLink}`
            : a.href;
      });
  }, []);
};
