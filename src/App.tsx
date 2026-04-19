import { useState } from 'react'
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
} from 'antd'
import './App.css'

const { Title, Paragraph, Text } = Typography

const roles = [
  { label: 'Armeiro (ARMORER)', value: 'ARMORER' },
  { label: 'Sub-Armeiro (SUB_ARMORER)', value: 'SUB_ARMORER' },
]

const grads = ['SD', 'CB', '3º SGT', '2º SGT', '1º SGT', 'ST', 'TEN', 'CAP']

const visualContent = {
  login: {
    title: 'Disciplina e Controle de Material Bélico',
    subtitle:
      'Acesse o sistema institucional de cautela com segurança e rastreabilidade.',
    image:
      'https://images.unsplash.com/photo-1542710573-9f4f3f27f9f5?auto=format&fit=crop&w=1400&q=80',
  },
  register: {
    title: 'Cadastro de Operadores Militares',
    subtitle:
      'Registre usuários autorizados para o gerenciamento de armamento e munição.',
    image:
      'https://images.unsplash.com/photo-1584447128309-b66b7fcb0d88?auto=format&fit=crop&w=1400&q=80',
  },
}

function App() {
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)

  const activeVisual = isRegister ? visualContent.register : visualContent.login

  const handleSubmit = async (values: Record<string, string>) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setLoading(false)

    message.success(
      isRegister
        ? `Cadastro enviado com sucesso para ${values.warName}.`
        : `Bem-vindo(a), ${values.email}.`,
    )
    console.log(values)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3A5A40',
          borderRadius: 10,
          colorBgContainer: '#101612',
          colorText: '#f3f6f4',
          colorTextPlaceholder: '#9fb1a6',
          colorBorder: '#344E41',
          controlHeight: 48,
          fontFamily: 'Inter, Segoe UI, sans-serif',
        },
      }}
    >
      <main className="auth-page">
        <section className={`auth-shell ${isRegister ? 'register-mode' : 'login-mode'}`}>
          <aside className="auth-visual" style={{ backgroundImage: `url(${activeVisual.image})` }}>
            <div className="visual-overlay" />
            <div className="visual-content">
              <Text className="kicker">Exército Brasileiro</Text>
              <Title level={2}>{activeVisual.title}</Title>
              <Paragraph>{activeVisual.subtitle}</Paragraph>
            </div>
          </aside>

          <section className="auth-form-area">
            <div className="auth-card">
              {!isRegister ? (
                <>
                  <Space direction="vertical" size={10} className="full-width">
                    <Text className="form-kicker">Acesso ao Sistema</Text>
                    <Title level={3} className="form-title">
                      Login Institucional
                    </Title>
                  </Space>

                  <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Informe seu email institucional.' },
                        { type: 'email', message: 'Digite um email válido.' },
                      ]}
                    >
                      <Input size="large" placeholder="✉️  militar@eb.mil.br" />
                    </Form.Item>

                    <Form.Item
                      label="Senha"
                      name="password"
                      rules={[{ required: true, message: 'Informe sua senha.' }]}
                    >
                      <Input.Password size="large" placeholder="🔒  ••••••••" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                      Entrar
                    </Button>
                  </Form>

                  <Button type="link" className="switch-mode" onClick={() => setIsRegister(true)}>
                    Criar conta
                  </Button>
                </>
              ) : (
                <>
                  <Space direction="vertical" size={10} className="full-width">
                    <Text className="form-kicker">Cadastro de Militar</Text>
                    <Title level={3} className="form-title">
                      Criar nova conta
                    </Title>
                  </Space>

                  <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                    initialValues={{ role: 'ARMORER', grad: 'CB' }}
                  >
                    <Form.Item
                      label="Nome de Guerra"
                      name="warName"
                      rules={[{ required: true, message: 'Informe o nome de guerra.' }]}
                    >
                      <Input size="large" placeholder="🪖  Ex: SILVA" />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Informe seu email.' },
                        { type: 'email', message: 'Digite um email válido.' },
                      ]}
                    >
                      <Input size="large" placeholder="✉️  militar@eb.mil.br" />
                    </Form.Item>

                    <Form.Item
                      label="Senha"
                      name="password"
                      rules={[
                        { required: true, message: 'Informe uma senha segura.' },
                        { min: 6, message: 'A senha deve possuir ao menos 6 caracteres.' },
                      ]}
                    >
                      <Input.Password size="large" placeholder="🔒  ••••••••" />
                    </Form.Item>

                    <Form.Item
                      label="Função"
                      name="role"
                      rules={[{ required: true, message: 'Selecione a função.' }]}
                    >
                      <Select size="large" options={roles} />
                    </Form.Item>

                    <Form.Item
                      label="Graduação"
                      name="grad"
                      rules={[{ required: true, message: 'Selecione a graduação.' }]}
                    >
                      <Select
                        size="large"
                        options={grads.map((grad) => ({ label: grad, value: grad }))}
                      />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                      Cadastrar
                    </Button>
                  </Form>

                  <Button type="link" className="switch-mode" onClick={() => setIsRegister(false)}>
                    Já tenho conta
                  </Button>
                </>
              )}
            </div>
          </section>
        </section>
      </main>
    </ConfigProvider>
  )
}

export default App
