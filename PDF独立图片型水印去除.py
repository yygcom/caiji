#coding:utf-8

# 需要确定水印图片的大小 然后修改参数来替换以达到删除效果，如果有多种尺寸的需要重复操作


import fitz,os

doc = fitz.open('input.pdf')

# 制作一个小的100%透明的pixmap（任意尺寸）
pix = fitz.Pixmap(fitz.csGRAY, (0, 0, 1, 1), 1)
pix.clear_with()  # clear all samples bytes to 0x00  将所有样本字节清除为0x00

for page in doc:
    #print(f"p:{page}")
    imageList = doc.get_page_images(page)

    #print(imageList)
    #images = page.get_images()
    #print(images)

    for imginfo in imageList:
        #print(imginfo)
        if imginfo[2] == 100 and imginfo[3] == 100: #找到水印的图片
            old_xref = imginfo[0]

            new_xref = page.insert_image(page.rect, pixmap=pix)

            # 替换图片copy
            doc.xref_copy(new_xref, old_xref)

#重新保存PDF
doc.save('111.pdf')
