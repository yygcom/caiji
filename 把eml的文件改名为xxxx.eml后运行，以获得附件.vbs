dim ado, oMsg
Set ado = CreateObject("Adodb.Stream")
set oMsg = CreateObject("CDO.Message")

' 读取文件二进制数据流
ado.Type = 1 '设置读取模式：1 = Binary，2 = Text
ado.Mode = 3 '1 只读，2 写入，3 读写。
ado.Open
ado.Loadfromfile "d:\pxx\xxxx.eml"

' 将EML数据流载入到CDO.Message
oMsg.DataSource.OpenObject ado, "_stream"

' 解析内容（每个字段不一定有，记得进行错误判断）
on error resume next

' 附件
wscript.echo "附件数量：" & oMsg.Attachments.Count
if oMsg.Attachments.Count > 0 Then
    Dim attach 'as CDO.BodyPart
    For Each attach In oMsg.Attachments
        'wscript.echo attach.ContentMediaType '附件文件类型
        'wscript.echo attach.FileName '附件文件名
        wscript.echo "保存" & attach.FileName & attach.GetDecodedContentStream.SaveToFile(attach.FileName, 2) '将附件二进制数据保存为源文件（1=不存在时新建/存在时报错(默认), 2=不存在时新建/存在时覆盖）
    Next
End if

' 关闭
ado.Close
