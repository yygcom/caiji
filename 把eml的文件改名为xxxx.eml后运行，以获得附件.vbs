dim ado, oMsg
Set ado = CreateObject("Adodb.Stream")
set oMsg = CreateObject("CDO.Message")

' ��ȡ�ļ�������������
ado.Type = 1 '���ö�ȡģʽ��1 = Binary��2 = Text
ado.Mode = 3 '1 ֻ����2 д�룬3 ��д��
ado.Open
ado.Loadfromfile "d:\pxx\xxxx.eml"

' ��EML���������뵽CDO.Message
oMsg.DataSource.OpenObject ado, "_stream"

' �������ݣ�ÿ���ֶβ�һ���У��ǵý��д����жϣ�
on error resume next

' ����
wscript.echo "����������" & oMsg.Attachments.Count
if oMsg.Attachments.Count > 0 Then
    Dim attach 'as CDO.BodyPart
    For Each attach In oMsg.Attachments
        'wscript.echo attach.ContentMediaType '�����ļ�����
        'wscript.echo attach.FileName '�����ļ���
        wscript.echo "����" & attach.FileName & attach.GetDecodedContentStream.SaveToFile(attach.FileName, 2) '���������������ݱ���ΪԴ�ļ���1=������ʱ�½�/����ʱ����(Ĭ��), 2=������ʱ�½�/����ʱ���ǣ�
    Next
End if

' �ر�
ado.Close
