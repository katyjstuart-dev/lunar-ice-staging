<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('Method not allowed'); }
function clean($v){ return trim(str_replace(["\r","\n"], ' ', (string)$v)); }
$name=clean($_POST['name']??''); $telephone=clean($_POST['telephone']??'');
$email=filter_var($_POST['email']??'', FILTER_VALIDATE_EMAIL); $repeat=filter_var($_POST['repeat_email']??'', FILTER_VALIDATE_EMAIL);
if(!$name || !$telephone || !$email || !$repeat || strtolower($email)!==strtolower($repeat)){ http_response_code(400); exit('Please check the required fields and make sure both email addresses match.'); }
$fields=[
'Name'=>$name,'Telephone'=>$telephone,'Email'=>$email,
'Delivery date'=>clean($_POST['delivery_date']??''),'Preferred 2-hour slot'=>clean($_POST['delivery_time']??''),
'Delivery postcode'=>clean($_POST['postcode']??''),'What3Words / access'=>clean($_POST['what3words']??''),
'Ice type'=>clean($_POST['ice_type']??''),'Purpose'=>clean($_POST['purpose']??''),'Quantity'=>clean($_POST['quantity']??''),
'How they heard about us'=>clean($_POST['heard']??''),'Message'=>trim((string)($_POST['message']??''))];
$body="New Lunar Ice website enquiry\n\n"; foreach($fields as $k=>$v){$body.=$k.": ".$v."\n";}
$headers="From: Lunar Ice Website <info@lunarice.co.uk>\r\nReply-To: ".$email."\r\nContent-Type: text/plain; charset=UTF-8";
$ok=mail('info@lunarice.co.uk','Website Enquiry',$body,$headers);
if($ok){ header('Location: contact.html?sent=1'); exit; }
http_response_code(500); echo 'Your enquiry could not be sent. Please call or WhatsApp Lunar Ice on 07907 783121.';
?>