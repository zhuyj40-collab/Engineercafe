import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Calendar, CheckCircle, Mail, Sparkles } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  category: 'schedule' | 'confirmation' | 'other';
  aiReply?: string;
  time: string;
}

export function EmailManagement() {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'hr@techcorp.com',
      subject: '技術面接のご案内',
      preview: 'この度は弊社のフロントエンドエンジニア職にご応募いただき...',
      category: 'schedule',
      aiReply: 'ご連絡ありがとうございます。面接のご案内をいただき、大変嬉しく思います。今週水曜日の14時から17時、または木曜日終日でしたら対応可能です。ご都合の良い時間帯をお知らせください。よろしくお願いいたします。',
      time: '10:30'
    },
    {
      id: '2',
      from: 'recruiter@startup.com',
      subject: '面接日程の確認',
      preview: '面接は12月20日15時に設定されました...',
      category: 'confirmation',
      aiReply: '承知いたしました。12月20日15時の面接に参加させていただきます。オンライン面接でしょうか、それとも対面でしょうか？対面の場合は、住所をお教えいただけますと幸いです。よろしくお願いいたします。',
      time: '09:15'
    },
    {
      id: '3',
      from: 'jobs@corporation.com',
      subject: 'Re: 給与条件のお問い合わせ',
      preview: 'お問い合わせいただいた給与範囲について...',
      category: 'other',
      aiReply: '詳細なご説明をありがとうございます。提示いただいた給与範囲は私の希望と合致しております。このポジションに大変興味がございますので、引き続きよろしくお願いいたします。',
      time: '昨日'
    }
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0]);
  const [editedReply, setEditedReply] = useState<string>(emails[0]?.aiReply || '');

  const getCategoryBadge = (category: string) => {
    const styles = {
      schedule: { label: '日程調整', variant: 'default' as const },
      confirmation: { label: '日程確認', variant: 'secondary' as const },
      other: { label: 'その他', variant: 'outline' as const }
    };
    return styles[category as keyof typeof styles];
  };

  const categorizedEmails = {
    schedule: emails.filter(e => e.category === 'schedule'),
    confirmation: emails.filter(e => e.category === 'confirmation'),
    other: emails.filter(e => e.category === 'other')
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    setEditedReply(email.aiReply || '');
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* 日程調整 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            日程調整
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categorizedEmails.schedule.map(email => (
            <div
              key={email.id}
              onClick={() => handleEmailSelect(email)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedEmail?.id === email.id ? 'bg-accent border-primary' : 'hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium truncate flex-1">{email.from}</p>
                <span className="text-xs text-muted-foreground">{email.time}</span>
              </div>
              <p className="text-xs truncate text-muted-foreground">{email.subject}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 日程確認 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            日程確認
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categorizedEmails.confirmation.map(email => (
            <div
              key={email.id}
              onClick={() => handleEmailSelect(email)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedEmail?.id === email.id ? 'bg-accent border-primary' : 'hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium truncate flex-1">{email.from}</p>
                <span className="text-xs text-muted-foreground">{email.time}</span>
              </div>
              <p className="text-xs truncate text-muted-foreground">{email.subject}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* その他 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            その他
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categorizedEmails.other.map(email => (
            <div
              key={email.id}
              onClick={() => handleEmailSelect(email)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedEmail?.id === email.id ? 'bg-accent border-primary' : 'hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium truncate flex-1">{email.from}</p>
                <span className="text-xs text-muted-foreground">{email.time}</span>
              </div>
              <p className="text-xs truncate text-muted-foreground">{email.subject}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI 自動返信 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AIスマート返信
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedEmail ? (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs mb-1">
                  <strong>送信者：</strong> {selectedEmail.from}
                </p>
                <p className="text-xs mb-1">
                  <strong>件名：</strong> {selectedEmail.subject}
                </p>
                <Badge {...getCategoryBadge(selectedEmail.category)} className="text-xs">
                  {getCategoryBadge(selectedEmail.category).label}
                </Badge>
              </div>
              
              <Textarea
                value={editedReply}
                onChange={(e) => setEditedReply(e.target.value)}
                className="min-h-[120px] text-sm"
                placeholder="AI生成の返信がここに表示されます..."
              />
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  返信を送信
                </Button>
                <Button variant="outline">
                  再生成
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              左側からメールを選択してください
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}