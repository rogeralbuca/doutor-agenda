/**
 * Helper para gerar iniciais de nomes como no Microsoft Teams
 * @param fullName - Nome completo da pessoa
 * @returns Iniciais em maiúsculo (ex: "AO" para "Antonio de Oliveira Silva")
 */
export const getNameInitials = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }

  // Remove espaços extras e divide o nome em palavras
  const names: string[] = fullName.trim().split(/\s+/).filter(name => name.length > 0);

  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    // Se há apenas um nome, pega as duas primeiras letras
    const singleName: string = names[0];
    return singleName.length >= 2
      ? singleName.substring(0, 2).toUpperCase()
      : singleName.substring(0, 1).toUpperCase();
  }

  // Se há múltiplos nomes, pega a primeira letra do primeiro e último nome
  const firstName: string = names[0];
  const lastName: string = names[names.length - 1];

  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
};