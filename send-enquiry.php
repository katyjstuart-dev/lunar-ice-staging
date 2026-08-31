<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: contact.html'); exit; }
$fields = ['name','telephone','email','repeat_email','delivery_date','delivery_time','postcode','what3words','ice_type','purpose','quantity','heard','message'];
$data=[]; foreach($fields as $f){ $data[$f]=trim($_POST[$f] ?? ''); }
if (!$data['name'] || !$data['telephone'] || !$data['email'] || !$data['repeat_email'] || !$data['delivery_date'] || !$data['delivery_time'] || !$data['postcode'] || !$data['quantity'] || !$data['heard'] || !$data['message']) { die('Please complete all required fields.'); }
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) || strcasecmp($data['email'],$data['repeat_email']) !== 0) { die('Please check the email addresses match.'); }
$clean=function($s){ return str_replace(["\r","\n"], ' ', $s); };
$body="Website Enquiry\n\n";
$labels=['name'=>'Name','telephone'=>'Telephone','email'=>'Email','delivery_date'=>'Date of Delivery','delivery_time'=>'Time of Delivery','postcode'=>'Postcode','what3words'=>'What3Words / exact access','ice_type'=>'Type of Ice','purpose'=>'Purpose','quantity'=>'How many bags','heard'=>'Where did you hear about us','message'=>'Message / additional delivery info'];
foreach($labels as $k=>$label){ $body .= $label.": ".$data[$k]."\n"; }
$headers="From: Lunar Ice Website <info@lunarice.co.uk>\r\n";
$headers.="Reply-To: ".$clean($data['email'])."\r\n";
$headers.="Content-Type: text/plain; charset=UTF-8\r\n";
$ok=mail('info@lunarice.co.uk','Website Enquiry',$body,$headers);
if($ok){ echo '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial;background:#0D174D;color:white;padding:8vw}a{color:#B0BC70}</style><h1>Thank you.</h1><p>Your enquiry has been sent to Lunar Ice.</p><p><a href="index.html">Back to the website</a></p>'; }
else { echo 'There was a problem sending the enquiry. Please call or WhatsApp 07907 783121.'; }
?>